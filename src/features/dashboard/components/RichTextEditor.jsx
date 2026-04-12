import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  HorizontalRule,
  Redo,
  StrikethroughS,
  Terminal,
  Undo,
} from '@mui/icons-material'
import { Box, Divider, FormHelperText, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const ToolbarButton = ({ onClick, active, disabled, icon, tooltip }) => (
  <Tooltip title={tooltip} arrow>
    <span>
      <IconButton
        size="small"
        onMouseDown={(e) => {
          e.preventDefault()
          onClick()
        }}
        disabled={disabled}
        sx={{
          color: active ? 'primary.main' : 'text.secondary',
          bgcolor: active ? 'action.selected' : 'transparent',
          borderRadius: 1,
          p: 0.5,
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        {icon}
      </IconButton>
    </span>
  </Tooltip>
)

ToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string,
}

const RichTextEditor = ({ value, onChange, error, helperText, label }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // コードブロックのデフォルト設定
        codeBlock: {
          HTMLAttributes: {
            class: 'tinypost-code-block',
          },
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: '本文を入力してください...',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      // 空のエディタ（<p></p>のみ）の場合は空文字を返す
      onChange(html === '<p></p>' ? '' : html)
    },
  })

  // 外部からvalueが変更された場合（編集モードでの初期値セット）に対応
  useEffect(() => {
    if (!editor) return
    if (value && editor.getHTML() !== value) {
      editor.commands.setContent(value, false)
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <Box sx={{ mt: 1, mb: 0.5 }}>
      {label && (
        <Typography variant="caption" color={error ? 'error' : 'text.secondary'} sx={{ mb: 0.5, display: 'block' }}>
          {label}
        </Typography>
      )}
      <Paper
        variant="outlined"
        sx={{
          borderColor: error ? 'error.main' : 'rgba(0,0,0,0.23)',
          borderRadius: 2,
          overflow: 'hidden',
          '&:hover': {
            borderColor: error ? 'error.main' : 'text.primary',
          },
          '&:focus-within': {
            borderColor: error ? 'error.main' : 'primary.main',
            borderWidth: 2,
          },
        }}
      >
        {/* ツールバー */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.25,
            p: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <ToolbarButton
            tooltip="太字 (Ctrl+B)"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            icon={<FormatBold fontSize="small" />}
          />
          <ToolbarButton
            tooltip="斜体 (Ctrl+I)"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            icon={<FormatItalic fontSize="small" />}
          />
          <ToolbarButton
            tooltip="下線 (Ctrl+U)"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            icon={<FormatUnderlined fontSize="small" />}
          />
          <ToolbarButton
            tooltip="打ち消し線"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            icon={<StrikethroughS fontSize="small" />}
          />

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <ToolbarButton
            tooltip="見出し1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            icon={<Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem', lineHeight: 1 }}>H1</Typography>}
          />
          <ToolbarButton
            tooltip="見出し2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            icon={<Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem', lineHeight: 1 }}>H2</Typography>}
          />
          <ToolbarButton
            tooltip="見出し3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            icon={<Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem', lineHeight: 1 }}>H3</Typography>}
          />

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <ToolbarButton
            tooltip="箇条書きリスト"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            icon={<FormatListBulleted fontSize="small" />}
          />
          <ToolbarButton
            tooltip="番号付きリスト"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            icon={<FormatListNumbered fontSize="small" />}
          />

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <ToolbarButton
            tooltip="インラインコード"
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            icon={<Code fontSize="small" />}
          />
          <ToolbarButton
            tooltip="コードブロック"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            icon={<Terminal fontSize="small" />}
          />
          <ToolbarButton
            tooltip="引用"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            icon={<FormatQuote fontSize="small" />}
          />
          <ToolbarButton
            tooltip="水平線"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            icon={<HorizontalRule fontSize="small" />}
          />

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <ToolbarButton
            tooltip="元に戻す (Ctrl+Z)"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={<Undo fontSize="small" />}
          />
          <ToolbarButton
            tooltip="やり直す (Ctrl+Y)"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={<Redo fontSize="small" />}
          />
        </Box>

        {/* エディタ本体 */}
        <Box
          sx={{
            p: 2,
            minHeight: 200,
            maxHeight: 480,
            overflowY: 'auto',
            cursor: 'text',
            '& .tiptap': {
              outline: 'none',
              minHeight: 180,
              lineHeight: 1.7,
              fontSize: '0.95rem',
              '& p': { margin: '0 0 0.75em 0' },
              '& p:last-child': { marginBottom: 0 },
              '& h1': { fontSize: '1.75em', fontWeight: 700, margin: '0.5em 0' },
              '& h2': { fontSize: '1.4em', fontWeight: 700, margin: '0.5em 0' },
              '& h3': { fontSize: '1.15em', fontWeight: 700, margin: '0.5em 0' },
              '& ul': { pl: 3, listStyleType: 'disc' },
              '& ol': { pl: 3 },
              '& li': { mb: 0.25 },
              '& code': {
                fontFamily: '"Fira Code", "Consolas", monospace',
                fontSize: '0.875em',
                bgcolor: 'action.hover',
                px: '4px',
                py: '2px',
                borderRadius: '4px',
                color: 'error.dark',
              },
              '& pre': {
                bgcolor: '#1e1e1e',
                color: '#d4d4d4',
                borderRadius: '8px',
                p: 2,
                overflowX: 'auto',
                my: 1.5,
                '& code': {
                  bgcolor: 'transparent',
                  color: 'inherit',
                  px: 0,
                  py: 0,
                  fontSize: '0.875em',
                },
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'primary.light',
                pl: 2,
                ml: 0,
                my: 1,
                color: 'text.secondary',
                fontStyle: 'italic',
              },
              '& hr': { border: 'none', borderTop: '1px solid', borderColor: 'divider', my: 2 },
              '& .is-editor-empty:first-child::before': {
                content: 'attr(data-placeholder)',
                color: 'text.disabled',
                float: 'left',
                height: 0,
                pointerEvents: 'none',
              },
            },
          }}
          onClick={() => editor.chain().focus().run()}
        >
          <EditorContent editor={editor} />
        </Box>
      </Paper>
      {helperText && (
        <FormHelperText error={error} sx={{ mx: '14px' }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  )
}

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
}

export default RichTextEditor
