import DeleteIcon from '@mui/icons-material/Delete';
import {Switch} from '@mui/material';
import {GridActionsCellItem, GridCellParams, GridColDef} from '@mui/x-data-grid-pro';
import CustomChip from 'src/@core/components/mui/chip';
import {TextField} from 'src/@prismafive/components/form-fields/text-field';
import {useGenericTableActions} from 'src/@prismafive/generics/table-actions';
import {usePerguntasModuleApi} from './api';
import {IAlternativas, IPergunta} from './types';

export function usePerguntasTableConfig() {
  const {actions} = useGenericTableActions({
    api: usePerguntasModuleApi(),
    route: '/cadastros/perguntas',
    permission: 'Cadastros.Perguntas', 
    excludeActions: ['delete']
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

  function generateConfig(): GridColDef<IPergunta>[] {
    return [
      {
        field: 'texto',
        headerName: `Texto`,
        flex: 0.6,
      },
      {
        field: 'dificuldade',
        headerName: `Dificuldade`,
        flex: 0.2,
        renderCell: (params: GridCellParams) => getDificuldadeComponent(params.row.dificuldade),
      },
      actions,
    ];
  }

  function generateConfigAlternativas(
    deleteFunction: (id: number) => void,
    editCorreta: (id: number, value: any) => void,
    editTexto: (id: number, value: string) => void,
    type: string
  ) {
    const columns = [
      {
        field: 'id',
        headerName: 'Número',
        flex: 0.1,
        sortable: false,
      },
      {
        field: 'texto',
        headerName: 'Texto',
        flex: 0.5,
        sortable: false,
        renderCell: (params: GridCellParams<IAlternativas>) => (
          <TextField
            value={params.row.texto}
            inputVariant={'standard'}
            onChange={(value) => editTexto(params.row.id, value)}
            disabled={type === 'details'}
            inputType="text"
          />
        ),
      },
      {
        field: 'correta',
        headerName: 'Correta',
        flex: 0.2,
        sortable: false,
        align: 'center',
        renderCell: (params: GridCellParams<IAlternativas>) => (
          <Switch
            checked={params.row.correta}
            onChange={(e) => editCorreta(params.row.id, e.target.checked)}
            disabled={type === 'details'}
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Remover',
        flex: 0.1,
        type: 'actions',
        getActions: (params: GridCellParams<IAlternativas>) => [
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
    generateConfigAlternativas,
  };
}
