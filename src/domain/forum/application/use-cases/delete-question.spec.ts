import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "@/factories/make-question";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository); // system under test
  });

  test("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID("question-1"));

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "question-1",
    });

    expect(question.id).toBeTruthy();
    expect(question.slug).toEqual(newQuestion.slug);
  });
});
