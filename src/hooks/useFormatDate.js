const useFormatDate = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '/')
  }

  return { formatDate }
}

export default useFormatDate
