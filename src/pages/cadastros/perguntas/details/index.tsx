import {PerguntasScreen} from 'src/#logiquiz/perguntas/screen';

const DetailsPerguntas = () => {
  return <PerguntasScreen type='details' title='Visualizar Pergunta'/>;
};

DetailsPerguntas.acl = {
  action: 'read',
  subject: 'Cadastros.Perguntas',
};

export default DetailsPerguntas;
