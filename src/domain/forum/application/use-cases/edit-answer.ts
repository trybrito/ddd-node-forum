import type { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
	answerId: string
	authorId: string
	content: string
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		answerId,
		authorId,
		content,
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId)

		if (!answer) {
			throw new Error('Question not found.')
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error('Not allowed.')
		}

		answer.content = content

		await this.answersRepository.save(answer)

		return {}
	}
}
