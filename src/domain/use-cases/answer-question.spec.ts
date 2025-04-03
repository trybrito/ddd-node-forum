import { describe, it, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

describe('Answer Question Use Case', () => {
  it('should create and answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Test Answer'
    })

    expect(answer.content).toEqual('Test Answer')
  })
})