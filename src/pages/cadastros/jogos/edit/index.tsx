import {JogosStep1Screen} from 'src/#logiquiz/jogos/pages/jogos-step';
import { getUrlParams } from 'src/@prismafive/helper/get-url-parameters';

const EditJogos = () => {
  const {id} = getUrlParams<{id: string}>(window);
  return <JogosStep1Screen type="edit" title="Editar Jogo" id={id}/>;
};

EditJogos.acl = {
  action: 'edit',
  subject: 'Cadastros.Jogos',
};

export default EditJogos;
