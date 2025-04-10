import { InMemoryQuestionsRepository } from 'tests/repositories/forum/in-memory-questions-repository'
import { makeQuestion } from 'tests/factories/forum/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to fetch recent questions', async () => {
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 2, 20) }),
		)
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 2, 21) }),
		)
		await inMemoryQuestionsRepository.create(
			makeQuestion({ createdAt: new Date(2025, 2, 18) }),
		)

		const result = await sut.execute({ page: 1 })

		expect(result.isRight()).toBe(true)

		if (result.isRight()) {
			expect(result.value.questions).toEqual([
				expect.objectContaining({ createdAt: new Date(2025, 2, 21) }),
				expect.objectContaining({ createdAt: new Date(2025, 2, 20) }),
				expect.objectContaining({ createdAt: new Date(2025, 2, 18) }),
			])
		}
	})

	it('should be able to fetch paginated recent questions', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryQuestionsRepository.create(
				makeQuestion({ createdAt: new Date(2025, 2, 20) }),
			)
		}

		const result = await sut.execute({ page: 2 })

		expect(result.isRight()).toBe(true)

		if (result.isRight()) {
			expect(result.value.questions).toHaveLength(2)
		}
	})

	it('should not be able to access an out of range page', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryQuestionsRepository.create(
				makeQuestion({ createdAt: new Date(2025, 2, 20) }),
			)
		}

		const result = await sut.execute({ page: 3 })

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(ResourceNotFoundError)
	})
})
