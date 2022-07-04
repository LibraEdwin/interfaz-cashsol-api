// @ts-check
import config from 'config'
import '@types'
import { getBaseUriApi, uriWithQuery } from 'helpers/utils'
const ENVIRONMENT = config.util.getEnv('NODE_CONFIG_ENV')
const ENDPOINT_PRODUCTS = getBaseUriApi('clients')

/**
 *
 * @param {Client} resource
 * @returns
 */
const single = (resource) => {
  return {
    id: resource._id,
    name: resource.name,
    lastname: resource.lastname,
    phone: resource.phone,
    addressData: resource.addressData,
    document: resource.document,
    email: resource.email,
    // password: resource.password,
    maritalStatus: resource.maritalStatus,
    profession: resource.profession,
    employmentStatus: resource.employmentStatus,
    company: resource.company,
    bankingEntity: resource.bankingEntity,
    accountNumber: resource.accountNumber,
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
    clients: docs.map(client => single(client))
  }
}

export default {
  single,
  multiple
}
