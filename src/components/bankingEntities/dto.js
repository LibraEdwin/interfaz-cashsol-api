// @ts-check
import config from 'config'
import '@types'
import { getBaseUriApi, uriWithQuery } from 'helpers/utils'

const ENVIRONMENT = config.util.getEnv('NODE_CONFIG_ENV')
const ENDPOINT_BANKING_ENTITIES = getBaseUriApi('bancking-entities')

/**
 *
 * @param {BankingEntity} bankingEntity
 * @returns
 */
const single = (bankingEntity) => {
  return {
    id: bankingEntity._id,
    name: bankingEntity.name,
    deleted: ENVIRONMENT !== 'production' && bankingEntity.deleted
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
    bankingEntities: docs.map(bankingEntity => single(bankingEntity))
  }
}

export default {
  single,
  multiple
}
