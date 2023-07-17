import { Entity } from "../../core/entities/entity";
import { Slug } from "./values-objects/slug";

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question extends Entity<QuestionProps> {}
