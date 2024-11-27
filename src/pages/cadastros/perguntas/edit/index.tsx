import {PerguntasScreen} from 'src/#logiquiz/perguntas/screen';

const EditPerguntas = () => {
  return <PerguntasScreen type='edit' title='Editar Pergunta'/>;
};

EditPerguntas.acl = {
  action: 'edit',
  subject: 'Cadastros.Perguntas',
};

export default EditPerguntas;
