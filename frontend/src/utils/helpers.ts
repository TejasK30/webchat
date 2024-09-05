
export const formatDate = async(date: Date) => {
  return date.toLocaleDateString('en-US', { day: 'numeric', weekday: 'long', year: 'numeric' })
}