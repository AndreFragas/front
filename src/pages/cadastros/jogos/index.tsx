import { JogosListScreen } from 'src/#logiquiz/jogos';
import {useJogosTableConfig} from 'src/#logiquiz/jogos/config';
import {ListPaginationCard} from 'src/@prismafive/components/cards/list-pagination-card';

const Jogos = () => {
  const config = useJogosTableConfig();
  return <JogosListScreen />;
};

Jogos.acl = {
  action: 'read',
  subject: 'Cadastros.Jogos',
};

export default Jogos;