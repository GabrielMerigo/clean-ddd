import { AnswerComment } from "../../enterprise/entities/answer-comments";

export interface AnswersCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
  findById(id: string): Promise<AnswerComment | null>;
  delete(answerComment: AnswerComment): Promise<void>;
}
