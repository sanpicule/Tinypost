import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'

import useResponsive from '@/hooks/useResponsive'

const TableHeader = ({ StyledTableCell }) => {
  const { mobile } = useResponsive()
  return (
    <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <TableRow>
        <StyledTableCell align="left" sx={{ width: '10%' }}>
          公開
        </StyledTableCell>
        <StyledTableCell align="left" sx={{ width: '15%' }}>
          タイトル
        </StyledTableCell>
        <StyledTableCell align="left" sx={{ width: '20%' }}>
          本文
        </StyledTableCell>
        {!mobile && (
          <>
            <StyledTableCell align="left" sx={{ width: '10%' }}>
              画像
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ width: '10%' }}>
              タグ
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ width: '10%' }}>
              作成日
            </StyledTableCell>
          </>
        )}
        <StyledTableCell align="left" sx={{ width: '10%' }}></StyledTableCell>
      </TableRow>
    </TableHead>
  )
}

TableHeader.propTypes = {
  StyledTableCell: PropTypes.PropTypes.elementType.isRequired,
}

export default TableHeader
