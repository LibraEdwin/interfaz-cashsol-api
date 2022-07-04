const single = (resource) => {
  return {
    id: resource._id,
    name: resource.name
  }
}

const multiple = (professions) => {
  return professions.map(profession => single(profession))
}

export default {
  single,
  multiple
}
