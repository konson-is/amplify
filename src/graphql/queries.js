/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const lambdainvoke = /* GraphQL */ `
  query Lambdainvoke {
    lambdainvoke
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      title
      description
      image
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        description
        image
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
