import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'tests/repositories/forum/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'tests/factories/forum/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'tests/repositories/forum/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from 'tests/factories/forum/make-answer-attachment'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository()

		sut = new EditAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerAttachmentsRepository,
		)
	})

	it('should be able to edit an answer', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('question-1'),
		)

		await inMemoryAnswersRepository.create(newAnswer)

		inMemoryAnswerAttachmentsRepository.items.push(
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityId('1'),
			}),
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityId('2'),
			}),
		)

		await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: 'author-1',
			content: 'Example content',
			attachmentsIds: ['1', '3'],
		})

		expect(inMemoryAnswersRepository.items[0]).toMatchObject({
			content: 'Example content',
		})

		expect(
			inMemoryAnswersRepository.items[0].attachments.currentItems,
		).toHaveLength(2)
		expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
			[
				expect.objectContaining({
					attachmentId: new UniqueEntityId('1'),
				}),
				expect.objectContaining({
					attachmentId: new UniqueEntityId('3'),
				}),
			],
		)
	})

	it('should not be able to edit answers from other users', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('question-1'),
		)

		await inMemoryAnswersRepository.create(newAnswer)

		const result = await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: 'different-author-1',
			content: 'Example content',
			attachmentsIds: [],
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	})
})
