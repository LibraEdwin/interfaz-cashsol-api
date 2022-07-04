const single = (resource) => {
  return {
    id: resource._id,
    name: resource.name,
    province: resource.provinceId._id,
    department: resource.departmentId._id
  }
}

const multiple = (districts) => {
  return districts.map(district => single(district))
}

export default {
  single,
  multiple
}
