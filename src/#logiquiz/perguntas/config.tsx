import DeleteIcon from '@mui/icons-material/Delete';
import {Switch} from '@mui/material';
import {GridActionsCellItem, GridCellParams} from '@mui/x-data-grid-pro';
import {TextField} from 'src/@prismafive/components/form-fields/text-field';
import {useGenericTableActions} from 'src/@prismafive/generics/table-actions';
import {usePerguntasModuleApi} from './api';
import {IAlternativas} from './types';
import { GridTextField } from 'src/@prismafive/components/form-fields-with-grid/grid-text-field';

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
        flex: 0.6,
      },
      {
        field: 'dificuldade',
        headerName: `Dificuldade`,
        flex: 0.2,
      },
      actions,
    ];
  }

  function generateConfigAlternativas(
    deleteFunction: (id: number) => void,
    editCorreta: (id: number, value: any) => void,
    editTexto: (id: number, value: string) => void,
  ) {
    return [
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
          <Switch checked={params.row.correta} onChange={(e) => editCorreta(params.row.id, e.target.checked)} />
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
  }

  return {
    generateConfig,
    generateConfigAlternativas,
  };
}
