import { AnswerComment } from "../../enterprise/entities/answer-comments";

export interface AnswersCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
}
