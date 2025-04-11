import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AnswerAttachmentProps {
	answerId: string
	attachmentId: string
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
	get answerId() {
		return this.props.answerId
	}

	get attachmentId() {
		return this.props.attachmentId
	}

	static create(props: AnswerAttachment, id?: UniqueEntityId) {
		const answerAttachment = new AnswerAttachment(props, id)

		return answerAttachment
	}
}
