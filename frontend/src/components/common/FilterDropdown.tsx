import React from 'react';
import Select from 'react-select';
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  selectedOptions: { value: string; label: string }[];
  onChange: (selectedOptions: { value: string; label: string }[]) => void;
  isMulti?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  onChange,
  isMulti = false,
}) => {
  const handleChange = (selected: any) => {
    onChange(selected || []);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        isMulti={isMulti}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={`Select ${label.toLowerCase()}`}
      />
    </FormControl>
  );
};

export default FilterDropdown;
