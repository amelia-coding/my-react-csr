import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { RecipeService } from '../services/recipe';
import { Recipe, RecipeInput } from '../types/recipe';

@Resolver(of => Recipe)
export class RecipeResolver {
  constructor(
    // constructor injection of service
    private readonly recipeService: RecipeService,
  ) {}

  @Query(returns => Recipe, { nullable: true })
  async recipe(@Arg('recipeId') recipeId: string) {
    return this.recipeService.getOne(recipeId);
  }

  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    console.log('111', this.recipeService);
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
