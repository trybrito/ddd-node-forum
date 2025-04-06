import type { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
	create: async (_: Question) => {
		return
	},
}

describe('Create Question Use Case', () => {
	it('should create a question', async () => {
		const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

		const { question } = await createQuestion.execute({
			authorId: '1',
			title: 'New Question',
			content: 'Test question',
		})

		expect(question.id).toBeTruthy()
		expect(question.content).toEqual('Test question')
	})
})
