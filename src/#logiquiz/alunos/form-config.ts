import * as yup from 'yup';

const defaultValues = {
  nome: '',
  email: '',
};

export function useAlunosFormConfig() {
  const schema = yup.object().shape({
    nome: yup.string().required().label('Nome'),
    email: yup.string().required().label('E-mail'),
  });

  return {
    schema,
    defaultValues,
  };
}

export type AlunosFormType = Partial<typeof defaultValues> & Record<string, any>;
