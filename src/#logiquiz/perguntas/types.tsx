export interface IPergunta {
  id: number;
  texto: string;
  dificuldade: number;
  alternativas: IAlternativas[];
}

export interface IAlternativas {
  id: number;
  texto: string;
  correta: boolean;
  pergunta_id: number;
}
