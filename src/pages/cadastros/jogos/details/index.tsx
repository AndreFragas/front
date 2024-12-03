import {JogosStep1Screen} from 'src/#logiquiz/jogos/pages/jogos-step';
import { getUrlParams } from 'src/@prismafive/helper/get-url-parameters';

const DetailsJogos = () => {
  const {id} = getUrlParams<{id: string}>(window);
  return <JogosStep1Screen type="details" title="Visualizar Jogo" id={id}/>;
};

DetailsJogos.acl = {
  action: 'read',
  subject: 'Cadastros.Jogos',
};

export default DetailsJogos;
