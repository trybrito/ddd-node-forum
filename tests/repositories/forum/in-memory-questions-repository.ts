import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'
import type { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = []

	constructor(
		private questionAttachmentsRepository?: QuestionAttachmentsRepository,
	) {}

	async findById(id: string) {
		const question =
			this.items.find((item) => item.id.toString() === id) ?? null

		return question
	}

	async findBySlug(slug: string) {
		const question = this.items.find((item) => item.slug.value === slug) ?? null

		return question
	}

	async findManyRecent({ page }: PaginationParams) {
		const questions = this.items
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * 20, page * 20)

		return questions
	}

	async create(question: Question) {
		this.items.push(question)
	}

	async save(question: Question): Promise<void> {
		const questionToBeUpdatedIndex = this.items.findIndex(
			(item) => item.id === question.id,
		)

		this.items[questionToBeUpdatedIndex] = question
	}

	async delete(question: Question) {
		const questionToBeDeletedIndex = this.items.findIndex(
			(item) => item.id === question.id,
		)

		this.items.splice(questionToBeDeletedIndex, 1)
		this.questionAttachmentsRepository?.deleteManyByQuestionId(
			question.id.toString(),
		)
	}
}
