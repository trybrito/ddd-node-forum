import type { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
	questionId: string
	page: number
}

interface FetchQuestionCommentsUseCaseResponse {
	questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
	constructor(private commentsRepository: QuestionCommentsRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
		const questionComments = await this.commentsRepository.findManyByQuestionId(
			questionId,
			{ page },
		)

		if (questionComments.length <= 0) {
			throw new Error('No question comments found.')
		}

		return { questionComments }
	}
}
