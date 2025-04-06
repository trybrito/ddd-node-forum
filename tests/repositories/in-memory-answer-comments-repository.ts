import type { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
	implements AnswerCommentsRepository
{
	public items: AnswerComment[] = []

	async findById(answerCommentId: string) {
		const answerComment =
			this.items.find((item) => item.id.toString() === answerCommentId) ?? null

		return answerComment
	}

	async create(answerComment: AnswerComment) {
		this.items.push(answerComment)
	}

	async delete(answerComment: AnswerComment) {
		const answerCommentToBeDeletedIndex = this.items.findIndex(
			(item) => item.id === answerComment.id,
		)

		this.items.splice(answerCommentToBeDeletedIndex, 1)
	}
}
