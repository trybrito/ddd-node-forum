import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'tests/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository()
		sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
	})

	it('should be able to fetch question comments', async () => {
		await inMemoryQuestionCommentsRepository.create(
			makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
		)
		await inMemoryQuestionCommentsRepository.create(
			makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
		)
		await inMemoryQuestionCommentsRepository.create(
			makeQuestionComment({ questionId: new UniqueEntityId('question-2') }),
		)

		const { questionComments } = await sut.execute({
			questionId: 'question-1',
			page: 1,
		})

		expect(questionComments).toHaveLength(2)
	})

	it('should be able to fetch paginated question comments', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryQuestionCommentsRepository.create(
				makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
			)
		}

		const { questionComments } = await sut.execute({
			questionId: 'question-1',
			page: 2,
		})

		expect(questionComments).toHaveLength(2)
	})

	it('should not be able to access an out of range page', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryQuestionCommentsRepository.create(
				makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
			)
		}

		expect(() =>
			sut.execute({ questionId: 'question-1', page: 3 }),
		).rejects.toBeInstanceOf(Error)
	})
})
