import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Slug } from './value-object/slug'
import { Entity } from '@/core/entities/entity'
import type { Optional } from '@/core/@types/optional'

interface QuestionProps {
	authorId: UniqueEntityId
	bestAnswerId?: UniqueEntityId
	title: string
	content: string
	slug: Slug
	createdAt: Date
	updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
	static create(
		props: Optional<QuestionProps, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		const question = new Question(
			{
				...props,
				createdAt: new Date(),
			},
			id,
		)

		return question
	}
}
