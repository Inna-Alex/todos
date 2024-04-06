import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import styles from './filterButton.module.scss';
import { updateFilterStatus } from '../../slices/todoSlice'
import * as Consts from '../../utils/consts'

export const statusOptions = [
  { value: Consts.Incomplete, label: 'Incomplete' },
  { value: Consts.Completed, label: 'Completed' },
];

const filterOptions = [
  { value: 'all', label: 'All' },
  ...statusOptions,
];

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: '#ecedf6',
    color: '#585858',
    fontWeight: 500,
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? '#dedfe1' : isSelected ? '#cccdde' : isFocused ? '#646681' : '#ecedf6',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontWeight: 500,
      color: isFocused & !isSelected ? '#fff' : '#000'
    };
  },
};

function FilterButton() {
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const dispatch = useDispatch()
  const updateFilter = (e) => {
    setSelectedOption(e.value)
    dispatch(updateFilterStatus(e.value))
  }

  return (
    <Select
      className={styles.select}
      defaultValue={selectedOption}
      onChange={(e) => updateFilter(e)}
      options={filterOptions}
      styles={colourStyles}
    />
  );
}

export default FilterButton;