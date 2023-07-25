import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";

interface IAnswerQuestionUseCaseProps {
  instructorId: string;
  questionId: string;
  content: string;
}

interface IAnswerQuestionUseCaseResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: IAnswerQuestionUseCaseProps): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return {
      answer,
    };
  }
}
