import { randomUUID } from "crypto";
import { Slug } from "./values-objects/slug";

interface QuestionPros {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public slug: Slug;
  public authorId: string;

  constructor(props: QuestionPros, id?: string) {
    this.title = props.title;
    this.content = props.content;
    this.slug = props.slug;
    this.authorId = props.authorId;
    this.id = id ?? randomUUID();
  }
}
