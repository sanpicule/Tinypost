import { Box, Stack } from '@mui/material'
import Link from '@tiptap/extension-link'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import useParseEditor from '@/hooks/useParseEditor'

import RichEditorToolbar from './RichEditorToolbar'

const Editor = ({ onChange, value }) => {
  const { parseContent } = useParseEditor()

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: true })],
    content: parseContent(value),
    editorProps: {
      attributes: {
        class: 'prose prose-base m-5 text-left',
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
    <Stack sx={{ border: 1, borderColor: 'gray', borderRadius: 1 }}>
      <RichEditorToolbar editor={editor} />
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'gray',
          px: 2,
          height: '50vh',
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
