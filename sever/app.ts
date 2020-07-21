import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import 'reflect-metadata';
import { integrateGraphql } from './graphql';
// import { router } from './router';

const app = new Koa();

integrateGraphql(app).then(server => {
  // 使用 bodyParser 和 KoaStatic 中间件
  app.use(bodyParser());
  app.use(KoaStatic(__dirname + '/build'));

  // app.use(router.routes()).use(router.allowedMethods());

  app.listen(4000, () => {
    console.log(`server running success at ${server.graphqlPath}`);
  });
});
