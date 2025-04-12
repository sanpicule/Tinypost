import { Box, Stack } from '@mui/material'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import useParseEditor from '@/hooks/useParseEditor'

import RichEditorToolbar from './RichEditorToolbar'

const Editor = ({ onChange, value }) => {
  const { parseContent } = useParseEditor()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Placeholder.configure({
        placeholder: 'ここに本文を入力してください…', // 任意のプレースホルダー文
      }),
    ],
    content: parseContent(value),
    editorProps: {
      attributes: {
        class: 'prose prose-base m-5 text-left is-editor',
        style: 'outline: none;',
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      onChange(json)
    },
  })

  // 初期データをエディターに反映
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(parseContent(value))
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <Stack sx={{ border: 1, borderColor: '#ccc', borderRadius: 2 }}>
      <RichEditorToolbar editor={editor} />
      <Box
        sx={{
          borderTop: 1,
          borderColor: '#d4d4d4',
          px: 2,
          minHeight: '100px', // 初期サイズ
          maxHeight: '50vh', // 最大サイズ
          height: 'auto', // 内容に応じて伸びる
          overflow: 'auto',
        }}
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent editor={editor} />
      </Box>
    </Stack>
  )
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

export default Editor
