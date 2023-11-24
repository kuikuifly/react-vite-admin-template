import React from 'react';
import { Select } from 'antd';

interface TypeSelectProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const TypeSelect: React.FC<TypeSelectProps> = (props) => {
  const { value, ...attr } = props;

  return (
    <Select value={value === '' ? undefined : value} {...attr} allowClear>
      <Select.Option value='header'>2023-10-27 20:30:05</Select.Option>
      <Select.Option value='footer'>2023-10-27 20:30:05</Select.Option>
    </Select>
  );
};

export default TypeSelect;
