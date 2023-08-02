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
    const result = await sut.execute({
      content: "content-question",
      instructorId: "instructor-id",
      questionId: "question-id",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items[0].id).toEqual(
      result.value?.answer.id
    );
  });
});
