import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Recipe, RecipeInput } from '../schemas/recipe';
import { RecipeService } from '../services/recipe';

@Resolver(of => Recipe)
export class RecipeResolver {
  constructor(
    private readonly recipeService: RecipeService, // constructor injection of service
  ) {}

  @Query(returns => Recipe, { nullable: true })
  async recipe(@Arg('recipeId') recipeId: string) {
    return this.recipeService.getOne(recipeId);
  }

  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return this.recipeService.getAll();
  }

  @Mutation(returns => Recipe)
  async addRecipe(@Arg('recipe') recipe: RecipeInput): Promise<Recipe> {
    return this.recipeService.add(recipe);
  }

  @FieldResolver()
  async numberInCollection(@Root() recipe: Recipe): Promise<number> {
    const index = await this.recipeService.findIndex(recipe);
    return index + 1;
  }
}
