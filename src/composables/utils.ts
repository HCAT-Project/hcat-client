export function setCookie(name: string, value: string, days: number) {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = `${name}=${value};expires=${d.toUTCString()}`
}

export function getCookie(name: string) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  return v ? v[2] : null
}

export function convertTimeStampToTime(timeStamp: number): string {
  const date = new Date(timeStamp * 1000)
  const dateString = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return dateString.replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$1/$2')
}

export function getDisplayTime(timeStamp: number): string {
  // 获取当前日期和时间
  const now = new Date(timeStamp)

  // 判断是否为今天
  const isToday = now.toDateString() === new Date().toDateString()

  // 格式化日期
  const date = isToday ? '今天' : now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })

  // 格式化时间
  const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })

  // 拼接日期和时间
  const datetime = isToday ? `${date} ${time}` : `${date} ${time}`

  // 显示
  return datetime// 示例输出：今天 23:20
}
