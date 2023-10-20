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
  // 如果是今天就返回 今天+时间,再判断是否是昨天 再判断是否是今年如果是就返回月日+时间,不是就返回年月日+时间
  if (date.toDateString() === new Date().toDateString()) {
    return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
  }
  else if (date.toDateString() === new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toDateString()) {
    return `昨天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
  }
  else if (date.getFullYear() === new Date().getFullYear()) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}月${day}日 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
  }
  else {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
  }
}
