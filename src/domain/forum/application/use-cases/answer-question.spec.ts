import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
	})

	it('should be able to create an answer', async () => {
		const { answer } = await sut.execute({
			questionId: '1',
			instructorId: '1',
			content: 'Test answer',
		})

		expect(answer.content).toEqual('Test answer')
		expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
	})
})
