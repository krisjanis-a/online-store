import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const makeQuery = async (queryObject) => {
  const response = await apolloClient.query({
    query: gql`
      ${queryObject}
    `,
  });
  return await response.data;
};

export default makeQuery;
