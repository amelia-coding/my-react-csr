import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Recipe {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
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
  @Field({ nullable: true })
  description: string;

  @Field(type => [String])
  ingredients: string[];

  @Field()
  title: string;
}
