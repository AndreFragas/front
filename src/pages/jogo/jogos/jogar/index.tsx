import {JogarScreen} from 'src/#logiquiz/jogar-jogos/jogar-screen';
import {getUrlParams} from 'src/@prismafive/helper/get-url-parameters';

const Jogar = () => {
  const {id} = getUrlParams<{id: string}>(window);
  return <JogarScreen type="edit" title="Jogar" id={id} />;
};

Jogar.acl = {
  action: 'read',
  subject: 'Jogo.Jogos',
};

export default Jogar;
