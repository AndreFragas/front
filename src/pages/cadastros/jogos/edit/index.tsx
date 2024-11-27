import {JogosScreen} from 'src/#logiquiz/jogos/screen';

const EditJogos = () => {
  return <JogosScreen type="edit" title='Editar Jogo' />;
};

EditJogos.acl = {
  action: 'edit',
  subject: 'Cadastros.Jogos',
};

export default EditJogos;
