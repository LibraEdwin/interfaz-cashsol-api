// @ts-check
import config from 'config'
import { getBaseUriApi, uriWithQuery } from 'helpers/utils'

const ENVIRONMENT = config.util.getEnv('NODE_CONFIG_ENV')
const ENDPOINT_PRODUCT_CATEGORIES = getBaseUriApi('productCategory')

export function single(productCategory) {
  return {
    id: productCategory._id,
    name: productCategory.name,
    loanTypeID: productCategory.loanTypeID,
    minInterest: productCategory.minInterest,
    maxInterest: productCategory.maxInterest,
    deleted: ENVIRONMENT !== 'production' && productCategory.deleted
  }
}

export function multiple(resources, query, path) {
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
  } = resources
  return {
    info: {
      totalDocs,
      totalPages,
      page,
      limit
    },
    links: {
      prev: hasPrevPage ? uriWithQuery(`${ENDPOINT_PRODUCT_CATEGORIES}${path ?? ''}`, { limit, page: prevPage, ...query }) : null,
      current: uriWithQuery(`${ENDPOINT_PRODUCT_CATEGORIES}${path ?? ''}`, { limit, page, ...query }),
      next: hasNextPage ? uriWithQuery(`${ENDPOINT_PRODUCT_CATEGORIES}${path ?? ''}`, { limit, page: nextPage, ...query }) : null
    },
    productCategories: docs.map(productCategory => single(productCategory))
  }
}
