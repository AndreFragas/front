import {JogosStep1Screen} from 'src/#logiquiz/jogos/pages/jogos-step-1';

const EditJogos = () => {
  return <JogosStep1Screen type="edit" title="Editar Jogo" />;
};

EditJogos.acl = {
  action: 'edit',
  subject: 'Cadastros.Jogos',
};

export default EditJogos;
