import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = []

	async findById(answerId: string) {
		const answer =
			this.items.find((item) => item.id.toString() === answerId) ?? null

		return answer
	}

	async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
		const answers = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20)

		return answers
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

	async save(answer: Answer) {
		const answerToBeUpdatedIndex = this.items.findIndex(
			(item) => item.id === answer.id,
		)

		this.items[answerToBeUpdatedIndex] = answer
	}
}
