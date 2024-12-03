import * as yup from 'yup';

const defaultValues = {};

export function useJogarJogosFormConfig() {
  const schema = yup.object().shape({});

  return {
    schema,
    defaultValues,
  };
}

export type JogarJogosFormType = Partial<typeof defaultValues> & Record<string, any>;
