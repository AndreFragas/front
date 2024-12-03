import {JogarJogosListScreen} from 'src/#logiquiz/jogar-jogos';

const JogarJogos = () => {
  return <JogarJogosListScreen />;
};

JogarJogos.acl = {
  action: 'read',
  subject: 'Jogo.Jogos',
};

export default JogarJogos;
