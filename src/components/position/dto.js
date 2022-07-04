// @ts-check
import { getBaseUriApi } from 'helpers/utils'

const ENDPOINT_POSITION = `${getBaseUriApi()}/position`

export function single(position) {
  return {
    id: position._id,
    name: position.name
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
      prev: hasPrevPage ? `${ENDPOINT_POSITION}?limit=${limit}&page=${prevPage}` : null,
      current: `${ENDPOINT_POSITION}?limit=${limit}&page=${page}`,
      next: hasNextPage ? `${ENDPOINT_POSITION}?limit=${limit}&page=${nextPage}` : null
    },
    positions: docs.map(position => single(position))
  }
}
