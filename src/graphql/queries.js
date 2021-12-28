/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      size
      brandCode
      year
      season
      largeCategory
      mediumCategory
      smallCategory
      color
      sku
      createdAt
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
        name
        price
        size
        brandCode
        year
        season
        largeCategory
        mediumCategory
        smallCategory
        color
        sku
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listProductsSortBySku = /* GraphQL */ `
  query ListProductsSortBySku(
    $sku: String
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsSortBySku(
      sku: $sku
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        price
        size
        brandCode
        year
        season
        largeCategory
        mediumCategory
        smallCategory
        color
        sku
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
