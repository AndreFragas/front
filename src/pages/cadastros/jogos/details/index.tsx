import {JogosStep1Screen} from 'src/#logiquiz/jogos/pages/jogos-step-1';

const DetailsJogos = () => {
  return <JogosStep1Screen type='details' title='Visualizar Jogo'/>;
};

DetailsJogos.acl = {
  action: 'read',
  subject: 'Cadastros.Jogos',
};

export default DetailsJogos;
