import { QuestionsRepository } from "../repositories/questions-repository";

interface IGetQuestionBySlugUseCaseProps {
  slug: string;
}

interface IGetQuestionBySlugUseCaseResponse {}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugUseCaseProps): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found!");
    }

    return {
      question,
    };
  }
}
