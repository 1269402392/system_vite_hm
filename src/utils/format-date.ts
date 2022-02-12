import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatDate(date: number, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.unix(date).format(format)
}
