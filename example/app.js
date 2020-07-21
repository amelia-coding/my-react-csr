// server/index.js

const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');

const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    hello: String
    user: [String]
    huser: [String]
  }
`; // 定义类型

const hello = 'world';
const users = ['12', '13'];

const resolvers = {
  Query: {
    hello() {
      return hello;
    },
    user() {
      return users;
    },
    huser() {
      return users.map(i => hello);
    },
  },
}; // resolve 定义

const app = new Koa();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // 开启开发UI调试工具
});

server.applyMiddleware({ app });

const port = 8000;
app.listen({ port }, () =>
  console.log(`graphql server start at http://localhost:${port}${server.graphqlPath}`),
);
// 开启服务，server.graphqlPath 默认为 /graphql
