import { get } from '../../utils/axios.js'

export async function totalMoneyForEveryMonthService(data) {
  return get(
    'statisticsAndAnalysis/totalMoneyForEveryMonth',
    data,
  )
}

export async function totalMoneyForEverydayService(data) {
  return get(
    'statisticsAndAnalysis/totalMoneyForEveryday',
    data,
  )
}

