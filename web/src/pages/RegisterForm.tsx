import { Box, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";


import Header from "../components/Header";
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { useHistory } from "react-router-dom";
import Fieldset from "../components/Fieldset";
import FooterForm from '../components/FooterForm';
import API from "../facade/API";

interface AddressFormData {
  street: string;
  number: number;
  city: string;
  country: string;
  zip: string;
}

interface FormData {
  user: {
    name: string;
    born: string;
    genere: "male" | "female" | "other";
    address: AddressFormData;
  }
  courseId: number;
}

export interface CourseList {
  id: number;
  name: string;
}

export interface CourseListSelect {
  value: number;
  label: string;
}

export default function RegisterForm() {
  const toast = useToast({
    position: "top-right",
  });
  const [courseList, setCourseList] = useState<CourseListSelect[]>([]);
  const { handleSubmit, register, formState } = useForm()
  const { isSubmitting, isDirty, errors } = formState;
  const history = useHistory();

  console.log(errors)

  useEffect(() => {
    API.get('courses').then((response) => {
      const formattedCourseList = response.data.map((course: CourseList) => ({
        value: course.id,
        label: course.name,
      }))
      setCourseList(formattedCourseList)
    })
  }, [])

  const onSubmit = useCallback<SubmitHandler<FormData>>(async (data) => {
    try {
      const formattedData = {
        user: {
          ...data.user,
          born: new Date(data.user.born),
          address: {
            ...data.user.address,
            number: +data.user.address.number
          },
        },
        courseId: +data.courseId,
      }
      await API.post('enrolls', formattedData);

      toast({
        title: "Matricula criada com sucesso.",
        status: "success",
      })
      history.push('/')
    } catch {
      toast({
        title: "Erro ao criar a matricula.",
        status: "error",
      })
    }
  }, [history, toast]);

  return (
    <Box>
      <Header title="Criação de matriculas de novos alunos."/>
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
          <Fieldset legend="Informações do aluno">
            <Input label="Nome completo" {...register('user.name')} />
            <Input 
              type="date" 
              label="Data de nascimento" 
              error={errors?.user?.born}
              {...register('user.born', {
                validate: value => {
                  const isMoreSeventeen = (new Date().getFullYear() - new Date(value).getFullYear()) < 17
                  console.log(isMoreSeventeen)
                  return !isMoreSeventeen || "É obrigatorio que o aluno seja maior de 17 anos."
                }
              })} 

            />
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
            />
            <Input label="Estado" {...register('user.address.state')} />
            <Input label="Cidade" {...register('user.address.city')} />
            <Input label="Rua" {...register('user.address.street')} />
            <Input 
              type="number" 
              min="1"
              label="Numero" 
              {...register('user.address.number')} 
            />
            <Input label="CEP" {...register('user.address.zip')} />
          </Fieldset>

          <Fieldset legend="Seleção do curso">
            <Select 
              label="Curso" 
              options={courseList}
              {...register('courseId')}  
            />
          </Fieldset>

          <FooterForm isDirty={isDirty} isSubmitting={isSubmitting} />
        </Box>
      </Box>
    </Box>
  )
}
