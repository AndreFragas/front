import {PerguntasScreen} from 'src/#logiquiz/perguntas/screen';

const CreatePerguntas = () => {
  return <PerguntasScreen type="create" title="Incluir Pergunta" />;
};

CreatePerguntas.acl = {
  action: 'create',
  subject: 'Cadastros.Perguntas',
};

export default CreatePerguntas;
