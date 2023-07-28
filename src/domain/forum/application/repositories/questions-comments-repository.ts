import { QuestionComment } from "../../enterprise/entities/question-comments";

export interface QuestionsCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
