import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { FiAlertOctagon } from "react-icons/fi";
import { Link } from "react-router-dom";

interface FooterFormProps {
  isSubmitting: boolean;
  isDirty: boolean;
}

export default function FooterForm({ isSubmitting, isDirty }: FooterFormProps) {
  return (
    <Flex
      h="20"
      py="0"
      px="4rem"
      mt="2rem"
      border="0"
      bg="gray.100"
      align="center"
      justify="space-between"
    >
      <HStack spacing="4">
        <FiAlertOctagon size="24" color="#805AD5" />
        <Text
          d="flex"
          alignItems="center"
        >
          Preencha todos os dados
        </Text>
      </HStack>
      <HStack spacing="4">
        <Button 
          as={Link}
          to="/"
          w="120px"
          variant="outline"
          colorScheme="purple"
        >
          Voltar
        </Button>
        <Button 
          w="120px"
          type="submit" 
          colorScheme='purple'
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >
          Salvar
        </Button>
      </HStack>
    </Flex>
      
  )
}
