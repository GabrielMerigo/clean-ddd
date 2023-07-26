import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/values-objects/slug";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository); // system under test
  });

  test("should be able to get a question by slug", async () => {
    const newQuestion = Question.create({
      title: "Example Question",
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID(),
      content: "Example Content",
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "example-question",
    });

    expect(question.id).toBeTruthy();
    expect(question.slug).toEqual(newQuestion.slug);
  });
});
