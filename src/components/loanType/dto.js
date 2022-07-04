// @ts-check
import { getBaseUriApi } from 'helpers/utils'
import LoanTypeModel from './model'

const ENDPOINT_LOANTYPE = `${getBaseUriApi()}/loanType`

export function single(loanType) {
  return (loanType)
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
      prev: hasPrevPage ? `${ENDPOINT_LOANTYPE}?limit=${limit}&page=${prevPage}` : null,
      current: `${ENDPOINT_LOANTYPE}?limit=${limit}&page=${page}`,
      next: hasNextPage ? `${ENDPOINT_LOANTYPE}?limit=${limit}&page=${nextPage}` : null
    },
    loanType: docs.map(loanType => single(loanType))
  }
}

export const getAllLoanType = async () => {
  return await LoanTypeModel.find()
}

export const createLoanType = async (loanType) => {
  const newLoanType = new LoanTypeModel(loanType)

  return await newLoanType.save()
}
