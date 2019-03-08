import axios from 'axios'

export function getHoliday(date) {
  let now = new Date()
  const url = `/api/getHoliday?d=${now.getTime()}&date=${date}`

  return axios.get(url, {}).then((res) => {
    return Promise.resolve(res.data)
  })
}
