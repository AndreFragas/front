import {IPergunta} from '../perguntas/types';

export interface IJogo {
  id: number;
  nome: string;
  descricao: string;
  dificuldade: number;
  fases: IFase[];
}

export interface IFase {
  id: number;
  numero: number;
  jogo_id: number;
  perguntas: IPerguntasFase[];
}

export interface IPerguntasFase {
  id: number;
  fase_id: number;
  pergunta_id: number;
  pergunta: IPergunta;
}
