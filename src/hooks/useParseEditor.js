const useParseEditor = () => {
  const parseContent = (content) => {
    if (!content) {
      return { type: 'doc', content: [] }
    }
    if (typeof content === 'string') {
      try {
        return JSON.parse(content)
      } catch (error) {
        console.error('Invalid JSON format for initialContent:', error)
        return { type: 'doc', content: [] }
      }
    }
    return content
  }
  return { parseContent }
}

export default useParseEditor
