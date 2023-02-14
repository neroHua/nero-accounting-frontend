import { post} from '../../utils/axios.js'

export function loginService(data) {
  return post(
    'user/login',
    data,
  )
}
