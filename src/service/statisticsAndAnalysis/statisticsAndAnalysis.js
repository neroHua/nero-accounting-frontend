import { get } from '../../utils/axios.js'

export async function totalMoneyForEveryMonthService(data) {
  return get(
    'statisticsAndAnalysis/totalMoneyForEveryMonth',
    data,
  )
}
