import { makeAnswer } from 'tests/factories/forum/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'tests/repositories/forum/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
	})

	it('should send a notification when a new answer is created', async () => {
		const _onAnswerCreated = new OnAnswerCreated()

		const answer = makeAnswer()

		await inMemoryAnswersRepository.create(answer)
	})
})
