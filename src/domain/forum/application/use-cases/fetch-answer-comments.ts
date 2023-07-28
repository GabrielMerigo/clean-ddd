import { AnswerComment } from "../../enterprise/entities/answer-comments";
import { AnswersCommentsRepository } from "../repositories/answer-comments-repository";

interface IFetchAnswersCommentsUseCaseProps {
  answerId: string;
  page: number;
}

interface IFetchAnswersCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswersCommentsUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: IFetchAnswersCommentsUseCaseProps): Promise<IFetchAnswersCommentsUseCaseResponse> {
    const answerComments =
      await this.answersCommentsRepository.findManyByAnswerId(answerId, {
        page: page,
      });

    return {
      answerComments,
    };
  }
}
