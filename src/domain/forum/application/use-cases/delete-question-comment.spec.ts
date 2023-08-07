import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { makeQuestionComment } from "@/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-questions-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsCommentsRepository); // system under test
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionsCommentsRepository.create(questionComment);
    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    });

    expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryQuestionsCommentsRepository.create(questionComment);

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
