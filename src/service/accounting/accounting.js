import { post, deleteMethod, put, get } from '../../utils/axios.js'

export async function accountingAddService(data) {
  return post(
    'accounting',
    data,
  )
}

export async function accountingDeleteService(data) {
  return deleteMethod(
    'accounting/' + data,
    null,
  )
}

export async function accountingUpdateService(data) {
  return put(
    'accounting',
    data,
  )
}

export async function accountingGetByIdService(data) {
  return get(
    'accounting/detail/' + data,
    null,
  )
}

export async function accountingGetByPageService(data) {
  return get(
    'accounting/list',
    data,
  )
}

export async function accountingTagAddService(data) {
  return post(
    'accounting/tag',
    data,
  )
}

export async function accountingTagDeleteService(data) {
  return deleteMethod(
    'accounting/tag' + data,
    null,
  )
}

export async function accountingTagGetByPageService(data) {
  return get(
    'accounting/tag/list',
    data,
  )
}
