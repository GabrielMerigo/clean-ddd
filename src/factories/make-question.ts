import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/values-objects/slug";
import { faker } from "@faker-js/faker";

export const makeQuestion = (
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) => {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return question;
};
