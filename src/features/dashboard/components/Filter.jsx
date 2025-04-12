import SearchIcon from '@mui/icons-material/Search'
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import filterMenuList from '@public/data/filterMenuList'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import useResponsive from '@/hooks/useResponsive'

const Filter = ({
  searchParams,
  setSearchParams,
  handleChangeKeyword,
  handleSearchSubmit,
  keyword,
}) => {
  const searchLabel = searchParams.get('label')
  const [filterItem, setFilterItem] = useState(searchLabel || 0)
  const { mobile } = useResponsive()

  const handleChange = (e) => {
    setFilterItem(e.target.value)
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('label', filterItem)
    setSearchParams(newParams)
  }, [filterItem])

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: filterItem || filterMenuList[0].value,
    },
  })

  useEffect(() => {
    setSearchParams({ ...searchParams, label: filterItem })
  }, [filterItem])

  return (
    <Stack
      mt={4}
      direction={mobile ? 'column' : 'row'}
      gap={mobile ? 2 : 1}
      alignItems="center"
    >
      <TextField
        id="outlined-basic"
        label="テキスト"
        variant="outlined"
        size="small"
        value={keyword || ''}
        onChange={handleChangeKeyword}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSearchSubmit()
          }
        }}
        sx={{
          width: mobile ? '100%' : '500px',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <FormControl control={control} name="label" fullWidth>
        <InputLabel id="tag-select-label">タグを選択</InputLabel>
        <Select
          labelId="tag-select-label"
          id="tag-select"
          size="small"
          label="タグを選択"
          value={filterItem}
          sx={{ borderRadius: '8px', width: mobile ? '100%' : '150px' }}
          onChange={handleChange}
          error={!!errors.title}
        >
          {filterMenuList.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
Filter.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  handleChangeKeyword: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  keyword: PropTypes.string,
}

export default Filter
