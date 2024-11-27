import {JogosScreen} from 'src/#logiquiz/jogos/screen';

const CreateJogos = () => {
  return <JogosScreen type='create' title='Incluir Jogo'/>;
};

CreateJogos.acl = {
  action: 'create',
  subject: 'Cadastros.Jogos',
};

export default CreateJogos;
