import {useGenericTableActions} from 'src/@prismafive/generics/table-actions';
import {useJogosModuleApi} from './api';

export function useJogosTableConfig() {
  const {actions} = useGenericTableActions({
    api: useJogosModuleApi(),
    route: '/cadastros/jogos',
    permission: 'Cadastros.Jogos',
  });

  function generateConfig() {
    return [
      {
        field: 'descricao',
        headerName: `Descrição`,
        flex: 0.8,
      },
      actions,
    ];
  }

  return {
    generateConfig,
  };
}
