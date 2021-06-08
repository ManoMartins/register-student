import { Box, Flex, Heading } from "@chakra-ui/react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <Flex
      h="15rem"
      w="100wh"
      as="header"
      bg="purple.500"
      m="0 auto"
    >
      <Box
        maxW="46rem"
        m="3.2rem auto"
        position="relative"
      >

        <Heading
          w="80%"
          d="block"
          mb="6rem"
          as="strong"
          color="white"
          fontSize='4xl'
          fontWeight="700"
          lineHeight="short"
        >
          {title}
        </Heading>
      </Box>
    </Flex>
  )
}
