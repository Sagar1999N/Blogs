import moment from 'moment-timezone'

export const formatDate = (date) => {
  return moment(date).utc().tz('Asia/Kolkata').format('MMM DD, YYYY')
}

export const formatDateAgo = (date) => {
  return moment(date).utc().tz('Asia/Kolkata').fromNow()
}
