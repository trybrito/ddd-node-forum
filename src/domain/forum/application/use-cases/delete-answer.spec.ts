import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { makeAnswer } from 'tests/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
	})

	it('should be able to delete an answer', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('answer-1'),
		)

		await inMemoryAnswersRepository.create(newAnswer)
		await sut.execute({ authorId: 'author-1', answerId: 'answer-1' })

		expect(inMemoryAnswersRepository.items).toHaveLength(0)
	})

	it('should not be able to delete an answer when authorId does not matches', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('answer-1'),
		)

		await inMemoryAnswersRepository.create(newAnswer)

		await expect(() =>
			sut.execute({
				authorId: 'different-author-1',
				answerId: 'answer-1',
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
