import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import api from "../services/api";
import { Status } from "./RegisterList";
import Header from "../components/Header";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import Fieldset from "../components/Fieldset";
import FooterForm from "../components/FooterForm";
import { CourseList, CourseListSelect } from "./RegisterForm";

interface Params {
  id: string;
}

export default function RegisterFormEdit() {
  const { id } = useParams<Params>();
  const toast = useToast({ position: 'top-right' });
  const history = useHistory();

  const [courseList, setCourseList] = useState<CourseListSelect[]>([]);
  const [studentName, setStudentName] = useState("");
  const { handleSubmit, register, setValue, formState } = useForm();
  const { isSubmitting, isDirty, errors } = formState;

  useEffect(() => {
    api.get(`enrolls/${id}`).then((response) => {
      setStudentName(response.data.user.name);
      setValue('courseId', response.data.courseId);
      setValue('user', response.data.user);
      setValue('status', response.data.status);
    })
  }, [id, setValue])

  useEffect(() => {
    api.get<CourseList[]>('courses').then((response) => {
      const formattedCourseList = response.data.map((course) => ({
        value: course.id,
        label: course.name,
      }))
      setCourseList(formattedCourseList)
    })
  }, [])

  const handleDeleteRegister = useCallback(async () => {
    try {
      await api.delete(`enrolls/${id}`)
      history.push('/')
      toast({
        title: "Matricula excluida com sucesso.",
        status: "success",
      })
    } catch {
      toast({
        title: "Erro ao excluir a matricula.",
        status: "error",
      })
    }
  }, [id, toast, history]);

  const onSubmit = useCallback<SubmitHandler<any>>(async (data) => {
    try {
      const formattedData = {
        ...data,
        courseId: +data.courseId,
      }
      await api.put(`enrolls/${id}`, formattedData)
      history.push('/')
      toast({
        title: "Matricula editada com sucesso.",
        status: "success",
      })
    } catch {
      toast({
        title: "Erro ao editar a matricula.",
        status: "error",
      })
    }
  }, [id, toast, history]);

  return (
    <Box>
      <Header title={`Editando matricula do aluno ${studentName}`} />
      <Box 
        w="100%"  
        as="main"
        bg="white"
        maxW="46rem"
        overflow="hidden"
        borderRadius="0.8rem"
        m="-3.2rem auto 3.2rem"
      >
        <Box 
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex w="100%">
            <Button
              colorScheme="red" 
              m="2rem 2rem -2rem auto"
              onClick={handleDeleteRegister}
            >
              Excluir
            </Button>
          </Flex>
          <Fieldset legend="Informações do aluno">
            <Input label="Nome completo" {...register('user.name')} />
            <Select 
              label="Genero" 
              options={[
                { label: "Masculino", value: "male"},
                { label: "Feminino", value: "female"},
                { label: "Outros", value: "other"},
              ]}
              {...register('user.genere')} 
            />
          </Fieldset>

          <Fieldset legend="Informações de endereço">
            <Input 
              label="País" 
              error={errors?.user?.address?.country}
              {...register('user.address.country', {
                validate: value => value === 'Brasil' || 'É obrigatorio que aluno more no Brasil.'
              })} 
              {...register('user.address.country')} 
            />
            <Input label="Estado" {...register('user.address.state')} />
            <Input label="Cidade" {...register('user.address.city')} />
            <Input label="Rua" {...register('user.address.street')} />
            <Input label="Numero" {...register('user.address.number')} type="number" />
            <Input label="CEP" {...register('user.address.zip')} />
          </Fieldset>

          <Fieldset legend="Informações do curso">
            <Select 
              label="Curso" 
              options={courseList}
              {...register('courseId')}  
            />
            <Select 
              label="Status" 
              options={[
                { label: Status.locked, value: 'locked'},
                { label: Status.studying, value: 'studying'},
                { label: Status.finished, value: 'finished'},
              ]}
              {...register('status')}  
            />
          </Fieldset>

          <FooterForm isDirty={isDirty} isSubmitting={isSubmitting} />

        </Box>
      </Box>
    </Box>
  )
}
