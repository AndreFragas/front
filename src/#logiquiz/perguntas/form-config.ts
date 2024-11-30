import * as yup from 'yup';
import {IAlternativas} from './types';

const defaultValues = {
  texto: '',
  dificuldade: 1,
  alternativas: [] as IAlternativas[],
};

export function usePerguntasFormConfig() {
  const schema = yup.object().shape({
    texto: yup.string().required().label('Texto'),
    dificuldade: yup.number().required().label('Dificuldade'),
  });

  return {
    schema,
    defaultValues,
  };
}

export type PerguntasFormType = Partial<typeof defaultValues> & Record<string, any>;
