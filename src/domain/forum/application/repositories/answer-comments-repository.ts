import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
	findById(answerCommentId: string): Promise<AnswerComment | null>
	create(answerComment: AnswerComment): Promise<void>
	delete(answerComment: AnswerComment): Promise<void>
}
