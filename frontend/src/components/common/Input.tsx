import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import React from "react";

interface CustomInputProps extends InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const Input: React.FC<CustomInputProps> = ({
  placeholder,
  type = "text",
  value,
  onChange,
  isDisabled,
  isReadOnly,
  ...props
}) => {
  return (
    <ChakraInput
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      borderRadius="5px"
      {...props} // You can selectively pass only specific props instead of all props
    />
  );
};

export default Input;
