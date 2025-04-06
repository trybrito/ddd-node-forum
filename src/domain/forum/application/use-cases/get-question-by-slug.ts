import type { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

type GetQuestionBySlugUseCaseRequest = {
	slug: string
}

type GetQuestionBySlugUseCaseResponse = {
	question: Question
}

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug)

		if (!question) {
			throw new Error('Question not found.')
		}

		return { question }
	}
}
