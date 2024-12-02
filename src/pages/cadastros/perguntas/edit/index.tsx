import {PerguntasScreen} from 'src/#logiquiz/perguntas/screen';
import { getUrlParams } from 'src/@prismafive/helper/get-url-parameters';

const EditPerguntas = () => {
  const {id} = getUrlParams<{id: string}>(window);
  return <PerguntasScreen type='edit' title='Editar Pergunta' id={id}/>;
};

EditPerguntas.acl = {
  action: 'edit',
  subject: 'Cadastros.Perguntas',
};

export default EditPerguntas;
