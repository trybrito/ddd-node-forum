import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { makeAnswer } from 'tests/factories/make-answer'
import { FetchQuestionAnswersUseCase } from './fetch-question-aswers'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
	})

	it('should be able to fetch question answers', async () => {
		await inMemoryAnswersRepository.create(
			makeAnswer({ questionId: new UniqueEntityId('question-1') }),
		)
		await inMemoryAnswersRepository.create(
			makeAnswer({ questionId: new UniqueEntityId('question-1') }),
		)
		await inMemoryAnswersRepository.create(
			makeAnswer({ questionId: new UniqueEntityId('question-2') }),
		)

		const { answers } = await sut.execute({ questionId: 'question-1', page: 1 })

		expect(answers).toHaveLength(2)
	})

	it('should be able to fetch paginated question answers', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryAnswersRepository.create(
				makeAnswer({ questionId: new UniqueEntityId('question-1') }),
			)
		}

		const { answers } = await sut.execute({ questionId: 'question-1', page: 2 })

		expect(answers).toHaveLength(2)
	})

	it('should not be able to access an out of range page', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryAnswersRepository.create(
				makeAnswer({ questionId: new UniqueEntityId('question-1') }),
			)
		}

		expect(() =>
			sut.execute({ questionId: 'question-1', page: 3 }),
		).rejects.toBeInstanceOf(Error)
	})
})
