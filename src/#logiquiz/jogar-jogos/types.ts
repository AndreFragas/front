export interface IJogarJogo {
  usuario_id?: number;
  jogo_id?: number;
  respostas: IRespostas[];
}

export interface IRespostas {
  pergunta_id: number;
  alternativa_id: number;
  fase_id: number;
}
