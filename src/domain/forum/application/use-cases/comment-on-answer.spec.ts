import { makeAnswer } from "@/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswersCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswerCommentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswersCommentsRepository
    ); // system under test
  });

  test("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Test Commentary",
    });

    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual(
      "Test Commentary"
    );
  });
});
