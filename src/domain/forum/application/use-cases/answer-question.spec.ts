import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository); // system under test
  });

  test("should be able to answer an question", async () => {
    const { answer } = await sut.execute({
      content: "content-question",
      instructorId: "instructor-id",
      questionId: "question-id",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id);
  });
});
