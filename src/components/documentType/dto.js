// @ts-check
import { getBaseUriApi } from 'helpers/utils'

const ENDPOINT_DOCUMENTTYPE = `${getBaseUriApi()}/documentType`

export function single(documentType) {
  return {
    id: documentType._id,
    name: documentType.name
  }
}

export function multiple(resources) {
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
      prev: hasPrevPage ? `${ENDPOINT_DOCUMENTTYPE}?limit=${limit}&page=${prevPage}` : null,
      current: `${ENDPOINT_DOCUMENTTYPE}?limit=${limit}&page=${page}`,
      next: hasNextPage ? `${ENDPOINT_DOCUMENTTYPE}?limit=${limit}&page=${nextPage}` : null
    },
    documentTypes: docs.map(documentType => single(documentType))
  }
}
