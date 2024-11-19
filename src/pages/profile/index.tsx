import {PerfilScreen} from 'src/#logiquiz/perfil/screen';

const Perfil = () => {
  return <PerfilScreen />;
};

Perfil.acl = {
  action: 'read',
  subject: 'Profile',
};

export default Perfil;
