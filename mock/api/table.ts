/* eslint-disable  ts/no-explicit-any */

import Mock from 'mockjs'
import { doCustomTimes, resultPageSuccess } from '../_util'

const { Random } = Mock

function tableList(pageSize) {
  const result: any[] = []
  doCustomTimes(pageSize, () => {
    result.push({
      'id': '@integer(10,999999)',
      'beginTime': '@datetime',
      'endTime': '@datetime',
      'address': '@county(true)',
      'name': '@cname()',
      'avatar': Random.image(
        '400x400',
        Random.color(),
        Random.color(),
        Random.first(),
      ),
      'date': `@datetime`,
      'time': `@time('HH:mm')`,
      'no|100000-10000000': 100000,
      'status|1': [true, false],
    })
  })
  return result
}

export default [
  {
    url: '/api/table/page',
    timeout: 1000,
    method: 'GET',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query
      const list = tableList(100)

      return resultPageSuccess(Number(page), Number(pageSize), list)
    },
  },
]
