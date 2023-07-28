import { QuestionComment } from "../../enterprise/entities/question-comments";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";

interface IFetchQuestionCommentsUseCaseProps {
  questionId: string;
  page: number;
}

interface IFetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository
  ) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionCommentsUseCaseProps): Promise<IFetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page: page,
      });

    return {
      questionComments,
    };
  }
}
