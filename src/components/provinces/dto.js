const single = (resource) => {
  return {
    id: resource._id,
    name: resource.name,
    department: resource.departmentId._id
  }
}

const multiple = (provinces) => {
  return provinces.map(province => single(province))
}

export default {
  single,
  multiple
}
