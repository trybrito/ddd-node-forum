import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = []

	async findById(answerId: string) {
		const answer =
			this.items.find((item) => item.id.toString() === answerId) ?? null

		return answer
	}

	async create(answer: Answer) {
		this.items.push(answer)
	}

	async delete(answer: Answer) {
		const answerToBeDeletedIndex = this.items.findIndex(
			(item) => item.id === answer.id,
		)

		this.items.splice(answerToBeDeletedIndex, 1)
	}
}
