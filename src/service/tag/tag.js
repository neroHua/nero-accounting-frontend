import { post, deleteMethod, put, get } from '../../utils/axios.js'

export async function tagAddService(data) {
  return post(
    'tag',
    data,
  )
}

export async function tagDeleteService(data) {
  return deleteMethod(
    'tag/' + data,
    null,
  )
}

export async function tagUpdateService(data) {
  return put(
    'tag',
    data,
  )
}

export async function tagGetByIdService(data) {
  return get(
    'tag/detail/' + data,
    null,
  )
}


export async function tagGetByPageService(data) {
  return get(
    'tag/list',
    data,
  )
}
