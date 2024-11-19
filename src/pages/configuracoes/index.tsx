import {ModuloScreen} from 'src/#logiquiz/modulos';

const Configuracoes = () => {
  return <ModuloScreen />;
};

Configuracoes.acl = {
  subject: 'Configuracoes',
  action: 'read',
};

export default Configuracoes;
