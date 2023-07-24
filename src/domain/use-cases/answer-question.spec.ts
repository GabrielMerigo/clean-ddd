import { AnswersRepository } from "../repositories/answer-repository";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswerRepository: AnswersRepository = {
  async create() {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    content: "New Answer",
    instructorId: "1",
    questionId: "2",
  });

  expect(answer.content).toEqual("New Answer");
});
