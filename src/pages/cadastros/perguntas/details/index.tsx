import {PerguntasScreen} from 'src/#logiquiz/perguntas/screen';
import {getUrlParams} from 'src/@prismafive/helper/get-url-parameters';

const DetailsPerguntas = () => {
  const {id} = getUrlParams<{id: string}>(window);
  return <PerguntasScreen type="details" title="Visualizar Pergunta" id={id} />;
};

DetailsPerguntas.acl = {
  action: 'read',
  subject: 'Cadastros.Perguntas',
};

export default DetailsPerguntas;
