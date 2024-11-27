import {JogosScreen} from 'src/#logiquiz/jogos/screen';

const DetailsJogos = () => {
  return <JogosScreen type='details' title='Visualizar Jogo'/>;
};

DetailsJogos.acl = {
  action: 'read',
  subject: 'Cadastros.Jogos',
};

export default DetailsJogos;
