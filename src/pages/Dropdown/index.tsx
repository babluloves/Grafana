import React, { useState } from 'react';
import Select, { Props as SelectProps, ActionMeta, MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
  { value: 'grape', label: 'Grape' },
];

const MultiSelectDropdown: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleMultiSelectChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (actionMeta.action === 'remove-value' || actionMeta.action === 'pop-value') {
      // Handle removal of values if needed
    }
    setSelectedOptions(newValue as Option[]);
  };

  return (
    <div>
      <Select
        options={options}
        isMulti
        onChange={handleMultiSelectChange}
        value={selectedOptions}
      />
    </div>
  );
};

export default MultiSelectDropdown;
