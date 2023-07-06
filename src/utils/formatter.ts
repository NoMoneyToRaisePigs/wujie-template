import moment from 'moment'

export function formatTimestamp(value: number) : string {
  if (!value || isNaN(value)) {
    return ''
  }

  return moment(value)
    .utc()
    .format('YYYY-MM-DD HH:mm:ss(UTC)')
}

export function formatPossibleEmptyString(value: string | number | null | undefined) : string {
  if (value === undefined || value === null || String(value).trim() === '') {
    return '-'
  }

  return String(value)
}