import { 
  FormControl, 
  FormLabel,
  forwardRef,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction } from "react";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label: string;
  options: Array<{
    label: string;
    value: string | number;
  }>
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({ 
  label, 
  name,
  options,
  ...rest
}: SelectProps, ref) => {
  return (
    <FormControl 
      mt="3"
      id={name}
    >
      <FormLabel>{label}</FormLabel>
      <ChakraSelect 
        
        id={name}
        name={name}
        ref={ref}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </ChakraSelect>
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase);

