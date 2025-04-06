import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-object/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to get a question by its slug', async () => {
		const newQuestion = Question.create({
			authorId: new UniqueEntityId(),
			title: 'New Question',
			slug: Slug.create('new-question'),
			content: 'Teste question',
		})

		await inMemoryQuestionsRepository.create(newQuestion)

		const { question } = await sut.execute({ slug: 'new-question' })

		expect(question.id).toEqual(newQuestion.id)
	})
})
