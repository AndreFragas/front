import {AlunosScreen} from 'src/#logiquiz/alunos/form-screen';
import {getUrlParams} from 'src/@prismafive/helper/get-url-parameters';

const DetailsAlunos = () => {
  const {id} = getUrlParams<{id: string}>(window);
  return <AlunosScreen type="details" title="Visualizar Jogo" id={id} />;
};

DetailsAlunos.acl = {
  action: 'read',
  subject: 'Cadastros.Alunos',
};

export default DetailsAlunos;
