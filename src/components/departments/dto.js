const single = (resource) => {
  return {
    id: resource._id,
    name: resource.name
  }
}

const multiple = (departments) => {
  return departments.map(department => single(department))
}

export default {
  single,
  multiple
}
