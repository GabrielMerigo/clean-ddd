import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseProps {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseProps): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    this.questionsRepository.create(question);

    return right({
      question,
    });
  }
}
