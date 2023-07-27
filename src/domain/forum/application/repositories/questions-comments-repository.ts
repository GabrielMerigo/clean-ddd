import { QuestionComment } from "../../enterprise/entities/question-comments";

export interface QuestionsCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
