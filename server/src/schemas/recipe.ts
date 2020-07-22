import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Recipe {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  title: string;

  @Field(type => String, { nullable: true })
  description?: string;

  @Field(type => [String])
  ingredients: string[];

  @Field(type => Int)
  protected numberInCollection: number;

  @Field(type => Int)
  protected get ingredientsLength(): number {
    return this.ingredients.length;
  }
}

@InputType()
export class RecipeInput implements Partial<Recipe> {
  @Field(type => String, { nullable: true })
  description: string;

  @Field(type => [String])
  ingredients: string[];

  @Field(type => String)
  title: string;
}
