import { Either, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface DeleteQuestionUseCaseProps {
  questionId: string;
  authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseProps): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not Allowed.");
    }

    await this.questionsRepository.delete(question);

    return right({});
  }
}
