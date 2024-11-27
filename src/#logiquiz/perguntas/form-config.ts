import * as yup from 'yup';

const defaultValues = {
  texto: '',
};

export function usePerguntasFormConfig() {
  const schema = yup.object().shape({
    texto: yup.string().required().label('Texto'),
  });

  return {
    schema,
    defaultValues,
  };
}

export type PerguntasFormType = Partial<typeof defaultValues> & Record<string, any>;
