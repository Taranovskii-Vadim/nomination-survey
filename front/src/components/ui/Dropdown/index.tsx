import React from "react";
import { SelectProps, Select as ChakraSelect } from "@chakra-ui/react";

import { Option } from "../../../store/surveyStore/types";

interface Props extends SelectProps {
  options: Option[];
}

const Dropdown = ({ options, ...props }: Props): JSX.Element => {
  return (
    <ChakraSelect {...props} placeholder="Укажите значение">
      {options.map(({ value, label }) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </ChakraSelect>
  );
};

export default Dropdown;
