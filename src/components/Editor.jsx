import { Box, Stack } from '@mui/material'
import Link from '@tiptap/extension-link'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import useParseEditor from '@/hooks/useParseEditor'

import RichEditorToolbar from './RichEditorToolbar'

const Editor = ({ setValue, initialContent }) => {
  const { parseContent } = useParseEditor()

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: true })],
    content: parseContent(initialContent),
    editorProps: {
      attributes: {
        class: 'prose prose-base m-5 text-left',
        style: 'outline: none;',
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      setValue('body', json) // JSONを保存
    },
  })

  // 初期データをエディターに反映
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(parseContent(initialContent))
    }
  }, [editor, initialContent])

  if (!editor) return null

  return (
    <Stack sx={{ border: 1, borderColor: 'gray', borderRadius: 1 }}>
      <RichEditorToolbar editor={editor} />
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'gray',
          p: 2,
          height: '50vh',
          overflow: 'auto',
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Stack>
  )
}

Editor.propTypes = {
  setValue: PropTypes.func.isRequired,
  initialContent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

export default Editor
