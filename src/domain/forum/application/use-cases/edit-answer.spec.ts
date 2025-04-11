import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'tests/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new EditAnswerUseCase(inMemoryAnswersRepository)
	})

	it('should be able to edit an answer', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('question-1'),
		)

		await inMemoryAnswersRepository.create(newAnswer)
		await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: 'author-1',
			content: 'Example content',
		})

		expect(inMemoryAnswersRepository.items[0]).toMatchObject({
			content: 'Example content',
		})
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
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	})
})
