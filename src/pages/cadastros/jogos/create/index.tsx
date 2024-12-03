import {JogosStep1Screen} from 'src/#logiquiz/jogos/pages/jogos-step';

const CreateJogos = () => {
  return <JogosStep1Screen type="create" title="Incluir Jogo" />;
};

CreateJogos.acl = {
  action: 'create',
  subject: 'Cadastros.Jogos',
};

export default CreateJogos;
