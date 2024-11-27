import {usePerguntasTableConfig} from 'src/#logiquiz/perguntas/config';
import {ListPaginationCard} from 'src/@prismafive/components/cards/list-pagination-card';

const Perguntas = () => {
  const config = usePerguntasTableConfig();
  return (
    <ListPaginationCard title="Perguntas" tableConfig={config.generateConfig()} route="/api/perguntas/paginationList" />
  );
};

Perguntas.acl = {
  action: 'read',
  subject: 'Cadastros.Perguntas',
};

export default Perguntas;