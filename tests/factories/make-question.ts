import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
	Question,
	type QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-object/slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
	const question = Question.create({
		authorId: new UniqueEntityId(),
		title: 'New Question',
		slug: Slug.create('new-question'),
		content: 'Teste question',
		...override,
	})

	return question
}
