import type { AnswerComment } from '../../enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
	answerId: string
	page: number
}

interface FetchAnswerCommentsUseCaseResponse {
	answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
	constructor(private commentsRepository: AnswerCommentsRepository) {}

	async execute({
		answerId,
		page,
	}: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
		const answerComments = await this.commentsRepository.findManyByAnswerId(
			answerId,
			{ page },
		)

		if (answerComments.length <= 0) {
			throw new Error('No answer comments found.')
		}

		return { answerComments }
	}
}
