import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from './value-object/slug'
import type { Optional } from '@/core/@types/optional'
import dayjs from 'dayjs'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { QuestionAttachmentList } from './question-attachment-list'

export interface QuestionProps {
	authorId: UniqueEntityId
	bestAnswerId?: UniqueEntityId
	title: string
	content: string
	slug: Slug
	attachments: QuestionAttachmentList
	createdAt: Date
	updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
	get authorId() {
		return this.props.authorId
	}

	get bestAnswerId() {
		return this.props.bestAnswerId
	}

	get title() {
		return this.props.title
	}

	get content() {
		return this.props.content
	}

	get slug() {
		return this.props.slug
	}

	get attachments() {
		return this.props.attachments
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	get isNew() {
		return dayjs().diff(this.props.createdAt, 'days') <= 3
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

	set title(title: string) {
		this.props.title = title
		this.props.slug = Slug.createFromText(this.props.title)

		this.touch()
	}

	set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
		this.props.bestAnswerId = bestAnswerId
		this.touch()
	}

	set attachments(attachments: QuestionAttachmentList) {
		this.props.attachments = attachments
		this.touch()
	}

	static create(
		props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
		id?: UniqueEntityId,
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				attachments: props.attachments ?? new QuestionAttachmentList(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return question
	}
}
