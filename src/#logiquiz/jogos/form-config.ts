import * as yup from 'yup';
import {IPergunta} from '../perguntas/types';

const defaultValues = {
  nome: '',
  descricao: '',
  dificuldade: 1,
  professor_id: undefined,
  perguntas: [] as IPergunta[],
  fase1: [] as number[],
  fase2: [] as number[],
  fase3: [] as number[]
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
