import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository); // system under test
  });

  test("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "New Question",
      content: "Content of Question",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
  });
});
