import { AnswerQuestionUseCase } from './answer-question'
import type { AnswersRepository } from '../repositories/answers-repository'
import type { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
	create: async (_: Answer) => {
		return
	},
}

describe('Answer Question Use Case', () => {
	it('should create and answer', async () => {
		const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

		const answer = await answerQuestion.execute({
			questionId: '1',
			instructorId: '1',
			content: 'Test Answer',
		})

		expect(answer.content).toEqual('Test Answer')
	})
})
