import {PerguntasListScreen} from 'src/#logiquiz/perguntas';

const Perguntas = () => {
  return <PerguntasListScreen />;
};

Perguntas.acl = {
  action: 'read',
  subject: 'Cadastros.Perguntas',
};

export default Perguntas;
