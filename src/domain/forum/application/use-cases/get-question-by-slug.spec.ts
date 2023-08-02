import { makeQuestion } from "@/factories/make-question";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
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
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.question).toEqual(newQuestion);
      expect(result.value.question.slug).toEqual(newQuestion.slug);
    }
  });
});
