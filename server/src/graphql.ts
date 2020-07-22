import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { sampleRecipes } from './mock/recipe';

// put sample recipes in container
Container.set({ id: 'SAMPLE_RECIPES', factory: () => sampleRecipes.slice() });

function getResolvers() {
  return [path.resolve(__dirname + '/resolvers/*')]; //不能带后缀ts，因为tsc编译后的找不到.ts结尾的文件
}

async function getSchema() {
  return buildSchema({
    resolvers: getResolvers(),
    container: Container,
  });
}

export async function integrateGraphql(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
  const server = new ApolloServer({
    schema: await getSchema(),
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    } as any,
    introspection: true,
    context: ({ ctx }) => ctx,
  });
  server.applyMiddleware({ app });
  return server;
}
