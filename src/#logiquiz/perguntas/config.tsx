import {useGenericTableActions} from 'src/@prismafive/generics/table-actions';
import {usePerguntasModuleApi} from './api';

export function usePerguntasTableConfig() {
  const {actions} = useGenericTableActions({
    api: usePerguntasModuleApi(),
    route: '/cadastros/perguntas',
    permission: 'Cadastros.Perguntas',
  });

  function generateConfig() {
    return [
      {
        field: 'texto',
        headerName: `Texto`,
        flex: 0.8,
      },
      actions,
    ];
  }

  return {
    generateConfig,
  };
}
