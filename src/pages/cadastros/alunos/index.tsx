import {AlunosListScreen} from 'src/#logiquiz/alunos/index';

const Alunos = () => {
  return <AlunosListScreen />;
};

Alunos.acl = {
  action: 'read',
  subject: 'Cadastros.Alunos',
};

export default Alunos;
