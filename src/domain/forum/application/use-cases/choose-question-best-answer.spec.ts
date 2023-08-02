import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "@/factories/make-answer";
import { makeQuestion } from "@/factories/make-question";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    inMemoryAnswersRepository = new InMemoryAnswerRepository();

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    ); // system under test
  });

  test("should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id
    );
  });

  test("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });

    const answer = makeAnswer({
      questionId: question.id,
    });

    inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
  });
});
