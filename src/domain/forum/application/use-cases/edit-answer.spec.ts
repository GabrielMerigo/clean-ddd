import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "@/factories/make-answer";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository); // system under test
  });

  test("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      content: "test answer content updated",
      answerId: newAnswer.id.toString(),
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "test answer content updated",
    });
  });

  test("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        content: "test answer content updated",
        answerId: newAnswer.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
