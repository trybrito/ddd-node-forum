import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

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

		const { questions } = await sut.execute({ page: 1 })

		expect(questions).toEqual([
			expect.objectContaining({ createdAt: new Date(2025, 2, 21) }),
			expect.objectContaining({ createdAt: new Date(2025, 2, 20) }),
			expect.objectContaining({ createdAt: new Date(2025, 2, 18) }),
		])
	})

	it('should be able to fetch paginated recent questions', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryQuestionsRepository.create(
				makeQuestion({ createdAt: new Date(2025, 2, 20) }),
			)
		}

		const { questions } = await sut.execute({ page: 2 })

		expect(questions).toHaveLength(2)
	})

	it('should not be able to access an out of range page', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryQuestionsRepository.create(
				makeQuestion({ createdAt: new Date(2025, 2, 20) }),
			)
		}

		expect(() => sut.execute({ page: 3 })).rejects.toBeInstanceOf(Error)
	})
})
