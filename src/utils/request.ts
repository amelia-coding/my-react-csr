import ApolloClient from 'apollo-boost';

const graphqlClient = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
});

export function requestData(gqlParam, callback?: Function): Promise<any> {
  //const yearParam = year === 'home' ? '0' : year;
  return graphqlClient
    .query({
      query: gqlParam,
    })
    .then(result => result.data);
}
