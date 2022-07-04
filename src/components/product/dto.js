// @ts-check
import config from 'config'
import { getBaseUriApi, uriWithQuery } from 'helpers/utils'

const ENVIRONMENT = config.util.getEnv('NODE_CONFIG_ENV')
const ENDPOINT_PRODUCTS = getBaseUriApi('product')

export function single(product) {
  return ({
    id: product._id,
    name: product.name,
    productCategoryID: product.productCategoryID,
    deleted: ENVIRONMENT !== 'production' && product.deleted
  })
}

export function multiple(data, query, path) {
  const {
    docs,
    totalDocs,
    limit,
    totalPages,
    page,
    // pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  } = data
  return {
    info: {
      totalDocs,
      totalPages,
      prevPage,
      nextPage,
      page,
      limit
    },
    links: {
      prev: hasPrevPage ? uriWithQuery(`${ENDPOINT_PRODUCTS}${path ?? ''}`, { limit, page: prevPage, ...query }) : null,
      current: uriWithQuery(`${ENDPOINT_PRODUCTS}${path ?? ''}`, { limit, page, ...query }),
      next: hasNextPage ? uriWithQuery(`${ENDPOINT_PRODUCTS}${path ?? ''}`, { limit, page: nextPage, ...query }) : null
    },
    products: docs.map(product => single(product))
  }
}
