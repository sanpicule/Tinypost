import React from 'react'

const TiptapPreview = ({ content }) => {
  const renderContent = (node) => {
    if (typeof node === 'string') {
      return node
    }

    if (Array.isArray(node.content)) {
      const children = node.content.map((child, index) => (
        <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
      ))

      switch (node.type) {
        case 'doc':
          return <div>{children}</div>
        case 'paragraph':
          return <p className="mb-4">{children}</p>
        case 'heading': {
          const HeadingTag = `h${node.attrs?.level || 1}`
          return <HeadingTag className="font-bold my-4">{children}</HeadingTag>
        }
        case 'bulletList':
          return <ul className="list-disc ml-6 my-4">{children}</ul>
        case 'orderedList':
          return <ol className="list-decimal ml-6 my-4">{children}</ol>
        case 'listItem':
          return <li className="my-1">{children}</li>
        case 'blockquote':
          return (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4">
              {children}
            </blockquote>
          )
        default:
          return <span>{children}</span>
      }
    }

    // テキストノードの処理
    if (node.type === 'text') {
      let content = node.text
      if (node.marks) {
        node.marks.forEach((mark) => {
          switch (mark.type) {
            case 'bold':
              content = <strong>{content}</strong>
              break
            case 'italic':
              content = <em>{content}</em>
              break
            case 'underline':
              content = <u>{content}</u>
              break
            case 'strike':
              content = <del>{content}</del>
              break
            case 'code':
              content = (
                <code className="bg-gray-100 px-1 rounded">{content}</code>
              )
              break
            case 'link':
              content = (
                <a
                  href={mark.attrs.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {content}
                </a>
              )
              break
          }
        })
      }
      return content
    }

    return null
  }

  try {
    const parsedContent =
      typeof content === 'string' ? JSON.parse(content) : content
    return <div className="tiptap-preview">{renderContent(parsedContent)}</div>
  } catch (error) {
    return <div className="text-red-500">コンテンツの解析に失敗しました</div>
  }
}

export default TiptapPreview
