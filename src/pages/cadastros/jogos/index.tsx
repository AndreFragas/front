import {useJogosTableConfig} from 'src/#logiquiz/jogos/config';
import {ListPaginationCard} from 'src/@prismafive/components/cards/list-pagination-card';

const Jogos = () => {
  const config = useJogosTableConfig();
  return <ListPaginationCard title="Jogos" tableConfig={config.generateConfig()} route="/api/jogos/paginationList" />;
};

Jogos.acl = {
  action: 'read',
  subject: 'Cadastros.Jogos',
};

export default Jogos;