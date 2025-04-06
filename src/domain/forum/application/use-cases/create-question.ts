import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
	authorId: string
	title: string
	content: string
}

interface CreateQuestionUseCaseResponse {
	question: Question
}

export class CreateQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		title,
		content,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			title,
			content,
		})

		await this.questionsRepository.create(question)

		return { question }
	}
}
