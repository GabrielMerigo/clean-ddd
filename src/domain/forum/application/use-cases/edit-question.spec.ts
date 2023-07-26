import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "@/factories/make-question";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository); // system under test
  });

  test("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      title: "test question title updated",
      content: "test question content updated",
      questionId: newQuestion.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "test question title updated",
      content: "test question content updated",
    });
  });

  test("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        title: "test question title updated",
        content: "test question content updated",
        questionId: newQuestion.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
