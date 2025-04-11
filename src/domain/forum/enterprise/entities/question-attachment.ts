import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface QuestionAttachmentProps {
	questionId: string
	attachmentId: string
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
	get questionId() {
		return this.props.questionId
	}

	get attachmentId() {
		return this.props.attachmentId
	}

	static create(props: QuestionAttachment, id?: UniqueEntityId) {
		const questionAttachment = new QuestionAttachment(props, id)

		return questionAttachment
	}
}
