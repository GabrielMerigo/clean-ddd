import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    content: "New Answer",
    instructorId: "1",
    questionId: "2",
  });

  expect(answer.content).toEqual("New Answer");
});
