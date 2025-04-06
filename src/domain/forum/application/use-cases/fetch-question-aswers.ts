import type { Answer } from '../../enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersUseCaseRequest {
	questionId: string
	page: number
}

interface FetchQuestionAnswersUseCaseResponse {
	answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			questionId,
			{ page },
		)

		if (answers.length <= 0) {
			throw new Error('No answers found.')
		}

		return { answers }
	}
}
