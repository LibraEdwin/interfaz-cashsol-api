// @ts-check
import config from 'config'
import '@types'
import { getBaseUriApi, uriWithQuery } from 'helpers/utils'
const ENVIRONMENT = config.util.getEnv('NODE_CONFIG_ENV')
const ENDPOINT_PRODUCTS = getBaseUriApi('product-details')

/**
 *
 * @returns
 */
const single = (resource) => {
  return {
    id: resource._id,
    product: resource.product,
    client: resource.client,
    appraisedValue: parseFloat(resource.appraisedValue),
    productName: resource.productName,
    year: resource.year,
    brand: resource.brand,
    model: resource.model,
    serie: resource.serie,
    features: resource.features,
    observationIntExt: resource.observationIntExt,
    observationOperation: resource.observationOperation,
    receptionDate: resource.receptionDate,
    returnDate: resource.returnDate,
    deleted: ENVIRONMENT !== 'production' && resource.deleted,
    refs: {

    }
  }
}

const multiple = (data, query, path) => {
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
    productDetails: docs.map(productDetail => single(productDetail))
  }
}

export default {
  single,
  multiple
}
