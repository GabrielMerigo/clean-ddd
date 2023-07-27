import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "@/factories/make-answer";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository); // system under test
  });

  test("should be able to get answers from a specific question", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-id") })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-id") })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("another-question") })
    );

    const { answers } = await sut.execute({
      questionId: "question-id",
      page: 1,
    });

    expect(answers).toHaveLength(2);
  });

  test("should be able to fetch paginated answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-id"),
        })
      );
    }

    const { answers } = await sut.execute({
      questionId: "question-id",
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
