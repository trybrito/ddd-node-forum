import type { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface QuestionCommentProps {
	authorId: UniqueEntityId
	questionId: UniqueEntityId
	content: string
	createdAt: Date
	updatedAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
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

	private touch() {
		this.props.updatedAt = new Date()
	}

	set content(content: string) {
		this.props.content = content
		this.touch()
	}

	static create(
		props: Optional<QuestionCommentProps, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		const questionComment = new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return questionComment
	}
}
