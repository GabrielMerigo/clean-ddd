import { makeQuestion } from "@/factories/make-question";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-questions-comments-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionsCommentsRepository
    ); // system under test
  });

  test("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question);
    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Test Commentary",
    });

    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual(
      "Test Commentary"
    );
  });
});
