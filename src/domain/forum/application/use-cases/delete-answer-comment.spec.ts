import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'tests/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Comment on Answer', () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
	})

	it('should be able to delete a answer comment', async () => {
		const answerComment = makeAnswerComment()

		await inMemoryAnswerCommentsRepository.create(answerComment)

		await sut.execute({
			answerCommentId: answerComment.id.toString(),
			authorId: answerComment.authorId.toString(),
		})

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
	})

	it('should not be able to delete another user answer comment', async () => {
		const answerComment = makeAnswerComment({
			authorId: new UniqueEntityId('author-1'),
		})

		await inMemoryAnswerCommentsRepository.create(answerComment)

		expect(() =>
			sut.execute({
				answerCommentId: answerComment.id.toString(),
				authorId: 'another-author-1',
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
