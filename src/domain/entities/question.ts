import { randomUUID } from 'node:crypto'
import type { Slug } from './value-object/slug'

interface QuestionProps {
	title: string
	content: string
	authorId: string
	slug: Slug
}

export class Question {
	public id: string
	public title: string
	public content: string
	public authorId: string
	public slug: Slug

	constructor(props: QuestionProps, id?: string) {
		this.id = id ?? randomUUID()
		this.title = props.title
		this.content = props.content
		this.authorId = props.authorId
		this.slug = props.slug
	}
}
