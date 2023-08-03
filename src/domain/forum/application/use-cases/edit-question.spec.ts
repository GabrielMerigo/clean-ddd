import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "@/factories/make-question";
import { makeQuestionAttachment } from "@/factories/make-question.attachment";
import { InMemoryQuestionsAttachmentsRepository } from "test/repositories/in-memory-questions-attachments-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionsAttachmentsRepository();

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsAttachmentsRepository
    ); // system under test
  });

  test("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    inMemoryQuestionsAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      })
    );

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: "author-1",
      title: "test question title updated",
      content: "test question content updated",
      attachmentsIds: ["1", "3"],
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "test question title updated",
      content: "test question content updated",
    });

    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityID("3") }),
    ]);
  });

  test("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: "author-2",
      title: "Test Question",
      content: "Test Content",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
  });
});
