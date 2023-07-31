import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";

interface FetchQuestionAnswersUseCaseProps {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<
  Answer,
  {
    answers: Answer[];
  }
>;

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseProps): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page: page }
    );

    return right({
      answers,
    });
  }
}
