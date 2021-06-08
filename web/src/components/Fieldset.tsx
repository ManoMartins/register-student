import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FieldsetProps {
  children: ReactNode;
  legend: string;
}

export default function Fieldset({ children, legend }: FieldsetProps) {
  return (
    <Box 
      as="fieldset"
      px="4rem"
      py="0"
      border="0"
      mt="4rem"
    >
      <Text
        as="legend"
        fontWeight="700"
        fontSize="xl"
        mb="2"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        pb="1.5"
        borderBottom="1px"
        borderStyle="solid"
        borderColor="gray.200"
      >
        {legend}
      </Text>
      {children}
    </Box>
  )
}
