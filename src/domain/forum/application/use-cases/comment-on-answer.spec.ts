import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { makeAnswer } from 'tests/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerCommentsRepository,
		)
	})

	it('should be able to create a comment on an answer', async () => {
		const answer = makeAnswer()

		await inMemoryAnswersRepository.create(answer)

		const { answerComment } = await sut.execute({
			authorId: answer.authorId.toString(),
			answerId: answer.id.toString(),
			content: 'Test comment on answer',
		})

		expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(
			answerComment.id,
		)
		expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
			'Test comment on answer',
		)
	})
})
