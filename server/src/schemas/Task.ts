import { Field, Int, ObjectType } from 'type-graphql';
import Project from './project';

@ObjectType()
export default class Task {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => Project)
  project: Project;

  @Field()
  completed: boolean;
}
