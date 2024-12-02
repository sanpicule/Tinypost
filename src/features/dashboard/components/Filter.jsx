import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import filterMenuList from '@public/data/filterMenuList'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

const Filter = ({ isFetch, setIsFetch }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchLabel = searchParams.get('label')
  const [filterItem, setFilterItem] = useState(searchLabel || 0)

  const handleChange = (e) => {
    setFilterItem(e.target.value)
    setIsFetch(!isFetch)
  }

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: filterItem || filterMenuList[0].value,
    },
  })

  useEffect(() => {
    setSearchParams({ label: filterItem })
  }, [filterItem])

  return (
    <FormControl fullWidth control={control} name="label" sx={{ mt: 2 }}>
      <InputLabel id="demo-simple-select-label">ラベル</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filterItem}
        label="ラベル"
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
  )
}
Filter.propTypes = {
  isFetch: PropTypes.bool,
  setIsFetch: PropTypes.func,
}

export default Filter
