import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'tests/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'tests/factories/make-question-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository()
		sut = new EditQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionAttachmentsRepository,
		)
	})

	it('should be able to edit a question', async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('question-1'),
		)

		await inMemoryQuestionsRepository.create(newQuestion)

		inMemoryQuestionAttachmentsRepository.items.push(
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityId('1'),
			}),
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityId('2'),
			}),
		)

		await sut.execute({
			questionId: newQuestion.id.toString(),
			authorId: 'author-1',
			title: 'Example Title',
			content: 'Example content',
			attachmentsIds: ['1', '3'],
		})

		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			title: 'Example Title',
			content: 'Example content',
		})

		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toHaveLength(2)
		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toEqual([
			expect.objectContaining({
				attachmentId: new UniqueEntityId('1'),
			}),
			expect.objectContaining({
				attachmentId: new UniqueEntityId('3'),
			}),
		])
	})

	it.skip('should not be able to edit questions from other users', async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('question-1'),
		)

		await inMemoryQuestionsRepository.create(newQuestion)

		const result = await sut.execute({
			questionId: newQuestion.id.toString(),
			authorId: 'different-author-1',
			title: 'Example Title',
			content: 'Example content',
			attachmentsIds: [],
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	})
})
