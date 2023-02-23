import { post} from '../../utils/axios.js'

export async function loginService(data) {
  return post(
    'user/login',
    data,
  )
}
