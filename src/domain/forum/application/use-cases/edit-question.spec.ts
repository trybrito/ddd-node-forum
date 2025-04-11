import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to edit a question', async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('question-1'),
		)

		await inMemoryQuestionsRepository.create(newQuestion)
		await sut.execute({
			questionId: newQuestion.id.toString(),
			authorId: 'author-1',
			title: 'Example Title',
			content: 'Example content',
		})

		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			title: 'Example Title',
			content: 'Example content',
		})
	})

	it('should not be able to edit questions from other users', async () => {
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
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	})
})
