import * as yup from 'yup';

const defaultValues = {
  descricao: '',
};

export function useJogosFormConfig() {
  const schema = yup.object().shape({
    descricao: yup.string().required().label('Descrição'),
  });

  return {
    schema,
    defaultValues,
  };
}

export type JogosFormType = Partial<typeof defaultValues> & Record<string, any>;
