import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { 
  Td, 
  Th, 
  Tr, 
  Box, 
  Flex, 
  Icon,
  Table, 
  Tbody, 
  Thead, 
  Button, 
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";

import api from "../services/api";
import Header from "../components/Header";

export enum Status {
  locked = "Trancado",
  studying = "Cursando",
  finished = "Finalizado",
}

interface Enroll {
  id: number;
  status: keyof typeof Status;
  course: {
    name: string;
  };
  user: {
    name: string;
    ra: number;
  };

}

export default function RegisterList() {
  const [registerList, setRegisterList] = useState<Enroll[]>([])

  useEffect(() => {
    api.get('enrolls').then((response) => {
      setRegisterList(response.data)
    })
  }, [])

  return (
    <Box >
      <Header title="Lista de todos os alunos cadastrados." />

      <Box maxW={1100} m="3rem auto">
        <Flex justify="space-between" px="2">
          <Heading size="lg" fontWeight="normal">Matriculas</Heading>
          <HStack spacing="4">
            <Menu>
              <MenuButton 
                size="sm"
                as={Button}
              >
                Exportar
              </MenuButton>
              <MenuList>
                <MenuItem 
                  as="a" 
                  href='http://localhost:3333/enrolls/export/csv'
                >
                  CSV
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              as={Link}
              to="/create-enroll"
              size="sm"
              fontSize="sm" 
              colorScheme="purple" 
              leftIcon={<Icon as={RiAddLine} />}
            >
              Nova matricula
            </Button>
          </HStack>
        </Flex>

        <Table bg="white" mt="4" borderRadius={8}>
          <Thead>
            <Tr>
              <Th>RA</Th>
              <Th>Nome completo</Th>
              <Th>Curso</Th>
              <Th>Status</Th>
              <Th w="8" />
            </Tr>
          </Thead>

          <Tbody>
            {registerList.map((enroll) => (
              <Tr key={enroll.id}>
                <Td>{enroll.user.ra}</Td>
                <Td>{enroll.user.name}</Td>
                <Td>{enroll.course.name}</Td>
                <Td>{Status[enroll.status]}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`edit-enroll/${enroll.id}`}
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} />}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

