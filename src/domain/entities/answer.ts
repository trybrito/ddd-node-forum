import type { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AnswerProps {
	questionId: UniqueEntityId
	authorId: UniqueEntityId
	content: string
	createdAt: Date
	updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
	get authorId() {
		return this.props.authorId
	}

	get content() {
		return this.props.content
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	get excerpt() {
		return this.props.content.substring(0, 120).trimEnd().concat('...')
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	set content(content: string) {
		this.props.content = content
		this.touch()
	}

	static create(
		props: Optional<AnswerProps, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		const answer = new Answer(
			{
				...props,
				createdAt: new Date(),
			},
			id,
		)

		return answer
	}
}
