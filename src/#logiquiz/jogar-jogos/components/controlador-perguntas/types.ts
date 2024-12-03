import {IPergunta} from 'src/#logiquiz/perguntas/types';

export interface FasePerguntasProps {
  perguntas: IPergunta[];
  onComplete: (resposta: { pergunta_id: number, alternativa_id: number}[]) => void;
}
