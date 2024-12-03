import {useGenericTableActions} from 'src/@prismafive/generics/table-actions';
import {useAlunosModuleApi} from './api';

export function useAlunosTableConfig() {
  const {actions} = useGenericTableActions({
    api: useAlunosModuleApi(),
    route: '/cadastros/alunos',
    permission: 'Cadastros.Alunos',
    excludeActions: ['delete', 'edit'],
  });

  function generateConfig() {
    return [
      {
        field: 'nome',
        headerName: `Nome`,
        flex: 0.2,
      },
      {
        field: 'email',
        headerName: `E-mail`,
        flex: 0.5,
      },
      actions,
    ];
  }

  return {
    generateConfig,
  };
}
