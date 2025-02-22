import { Button, Stack } from '@mui/material'
import { Editor } from '@tiptap/react'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import {
  MdFormatBold,
  MdFormatListNumbered,
  MdFormatQuote,
  MdRedo,
  MdUndo,
} from 'react-icons/md'

import useResponsive from '@/hooks/useResponsive'

const RichEditorToolbar = ({ editor }) => {
  const { mobile } = useResponsive()
  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.isActive('link')
      ? editor.getAttributes('link').href
      : ''
    const url = window.prompt('URL を入力してください', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().unsetLink().run()
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <Stack
      sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
    >
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        sx={{ opacity: editor.isActive('bold') ? 1 : 0.5 }}
      >
        <MdFormatBold size={mobile ? 20 : 30} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        sx={{ opacity: editor.isActive('bulletList') ? 1 : 0.5 }}
      >
        <MdFormatListNumbered size={mobile ? 20 : 30} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        sx={{ opacity: editor.isActive('blockquote') ? 1 : 0.5 }}
      >
        <MdFormatQuote size={mobile ? 20 : 30} />
      </Button>
      <Button
        onClick={setLink}
        sx={{ opacity: editor.isActive('link') ? 1 : 0.5 }}
      >
        <AiOutlineLink size={mobile ? 20 : 30} />
      </Button>
      <Button onClick={() => editor.chain().focus().undo().run()}>
        <MdUndo size={mobile ? 20 : 30} />
      </Button>
      <Button onClick={() => editor.chain().focus().redo().run()}>
        <MdRedo size={mobile ? 20 : 30} />
      </Button>
    </Stack>
  )
}

RichEditorToolbar.propTypes = {
  editor: PropTypes.instanceOf(Editor),
}

export default RichEditorToolbar
