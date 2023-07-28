import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeQuestionComment } from "@/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-questions-comments-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository); // system under test
  });

  it("should be able to get comment from a specific question", async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-id") })
    );

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-id") })
    );

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-id") })
    );

    const { questionComments } = await sut.execute({
      questionId: "question-id",
      page: 1,
    });

    expect(questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID("question-id"),
        })
      );
    }

    const { questionComments } = await sut.execute({
      questionId: "question-id",
      page: 2,
    });

    expect(questionComments).toHaveLength(2);
  });
});
