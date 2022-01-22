/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      sku
      name
      size
      color
      price
      fabric
      brandCode
      year
      season
      largeCategory
      mediumCategory
      smallCategory
      createdAt
      object
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sku
        name
        size
        color
        price
        fabric
        brandCode
        year
        season
        largeCategory
        mediumCategory
        smallCategory
        createdAt
        object
        updatedAt
      }
      nextToken
    }
  }
`;
export const listProductsSortByCreatedAt = /* GraphQL */ `
  query ListProductsSortByCreatedAt(
    $object: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsSortByCreatedAt(
      object: $object
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sku
        name
        size
        color
        price
        fabric
        brandCode
        year
        season
        largeCategory
        mediumCategory
        smallCategory
        createdAt
        object
        updatedAt
      }
      nextToken
    }
  }
`;
