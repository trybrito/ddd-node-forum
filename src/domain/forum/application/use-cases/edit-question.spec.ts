import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

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
			questionId: 'question-1',
			authorId: 'author-1',
			title: 'Example Title',
			content: 'Example content',
		})

		expect(inMemoryQuestionsRepository.items[0]).toEqual(
			expect.objectContaining({
				title: 'Example Title',
				content: 'Example content',
			}),
		)
	})

	it('should not be able to edit questions from other users', async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId('author-1'),
			},
			new UniqueEntityId('question-1'),
		)

		await inMemoryQuestionsRepository.create(newQuestion)

		await expect(() =>
			sut.execute({
				questionId: 'question-1',
				authorId: 'different-author-1',
				title: 'Example Title',
				content: 'Example content',
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
