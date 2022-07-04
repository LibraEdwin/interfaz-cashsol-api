// @ts-check
import config from 'config'
import '@types'
import { getBaseUriApi, uriWithQuery } from 'helpers/utils'

const ENVIRONMENT = config.util.getEnv('NODE_CONFIG_ENV')
const ENDPOINT_BANKING_ENTITIES = getBaseUriApi('items')

/**
 *
 * @param {Item} item
 * @returns
 */
const single = (item) => {
  return {
    id: item._id,
    name: item.name,
    deleted: ENVIRONMENT !== 'production' && item.deleted
  }
}

export const multiple = (data, query, path) => {
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
      prev: hasPrevPage ? uriWithQuery(`${ENDPOINT_BANKING_ENTITIES}${path ?? ''}`, { limit, page: prevPage, ...query }) : null,
      current: uriWithQuery(`${ENDPOINT_BANKING_ENTITIES}${path ?? ''}`, { limit, page, ...query }),
      next: hasNextPage ? uriWithQuery(`${ENDPOINT_BANKING_ENTITIES}${path ?? ''}`, { limit, page: nextPage, ...query }) : null
    },
    items: docs.map(item => single(item))
  }
}

export default {
  single,
  multiple
}
