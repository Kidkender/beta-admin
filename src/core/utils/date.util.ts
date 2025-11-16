export const mapDateString = {
  // Input: Mon Oct 20 2025 20:00:0 GMT+0700 (Indochina Time)
  toFormatRawServerUTC7: (date: Date = new Date()): string => {
    const tzOffset = -date.getTimezoneOffset() // phút → phút lệch múi giờ (VN = -420)
    const sign = tzOffset >= 0 ? '+' : '-'
    const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, '0')

    const hours = pad(tzOffset / 60)
    const minutes = pad(tzOffset % 60)

    const iso = date.toISOString().slice(0, 19) // YYYY-MM-DDTHH:mm:ss (UTC)
    return `${iso}${sign}${hours}:${minutes}`
  },

  // Ex: 2025-10-20T20:00:00+07:00
  toFormatClient: (data: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0')

    const year = data.getFullYear()
    const month = pad(data.getMonth() + 1)
    const day = pad(data.getDate())
    const hour = pad(data.getHours())
    const minute = pad(data.getMinutes())
    const second = pad(data.getSeconds())

    const tzOffset = -data.getTimezoneOffset()
    const sign = tzOffset >= 0 ? '+' : '-'
    const tzHour = pad(Math.floor(Math.abs(tzOffset) / 60))
    const tzMinute = pad(Math.abs(tzOffset) % 60)

    return `${year}-${month}-${day}T${hour}:${minute}:${second}${sign}${tzHour}:${tzMinute}`
  },

  // Ex: 2025-10-20T13:00:00.000Z
  toISOString: (dateString: string): string => {
    return new Date(dateString).toISOString()
  },
}
