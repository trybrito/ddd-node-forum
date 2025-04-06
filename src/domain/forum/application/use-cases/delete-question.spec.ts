import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to delete a question', async () => {
		const newQuestion = makeQuestion({}, new UniqueEntityId('question-1'))

		await inMemoryQuestionsRepository.create(newQuestion)
		await sut.execute({ questionId: 'question-1' })

		expect(inMemoryQuestionsRepository.items).toHaveLength(0)
	})
})
