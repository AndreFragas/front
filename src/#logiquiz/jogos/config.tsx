import DeleteIcon from '@mui/icons-material/Delete';
import {GridActionsCellItem, GridCellParams, GridColDef} from '@mui/x-data-grid-pro';
import CustomChip from 'src/@core/components/mui/chip';
import {useGenericTableActions} from 'src/@prismafive/generics/table-actions';
import {IPergunta} from '../perguntas/types';
import {useJogosModuleApi} from './api';
import {IJogo} from './types';

export function useJogosTableConfig() {
  const {actions} = useGenericTableActions({
    api: useJogosModuleApi(),
    route: '/cadastros/jogos',
    permission: 'Cadastros.Jogos',
    excludeActions: ['delete', 'edit'],
  });

  function getDificuldadeComponent(status: number) {
    if (typeof status !== 'number') return <></>;
    const statusSelector = [
      {},
      {color: 'success', label: 'Fácil'},
      {color: 'info', label: 'Médio'},
      {color: 'error', label: 'Difícil'},
    ];

    return (
      <CustomChip
        rounded
        size="small"
        skin="light"
        color={statusSelector[status].color as any}
        label={statusSelector[status].label}
        sx={{'& .MuiChip-label': {textTransform: 'capitalize'}}}
      />
    );
  }

  function generateConfig(): GridColDef<IJogo>[] {
    return [
      {
        field: 'nome',
        headerName: `Nome`,
        flex: 0.2,
      },
      {
        field: 'descricao',
        headerName: `Descrição`,
        flex: 0.5,
      },
      {
        field: 'dificuldade',
        headerName: `Dificuldade`,
        flex: 0.1,
        renderCell: (params: GridCellParams) => getDificuldadeComponent(params.row.dificuldade),
      },
      actions,
    ];
  }

  function perguntasFaseConfig(deleteFunction: (id: number) => void, type: string) {
    const columns = [
      {
        field: 'texto',
        headerName: `Texto`,
        flex: 0.6,
      },
      {
        field: 'dificuldade',
        headerName: `Dificuldade`,
        flex: 0.1,
        renderCell: (params: GridCellParams) => getDificuldadeComponent(params.row.dificuldade),
      },
      {
        field: 'actions',
        headerName: 'Remover',
        flex: 0.1,
        type: 'actions',
        getActions: (params: GridCellParams<IPergunta>) => [
          <GridActionsCellItem
            label="Excluir"
            icon={<DeleteIcon />}
            title={'Remover'}
            onClick={() => deleteFunction(params.row.id)}
          />,
        ],
      },
    ];

    return type === 'details' ? columns.filter((column) => column.field !== 'actions') : columns;
  }

  return {
    generateConfig,
    perguntasFaseConfig,
  };
}
