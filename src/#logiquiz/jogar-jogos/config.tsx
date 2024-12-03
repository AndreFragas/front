import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {GridActionsCellItem, GridCellParams, GridColDef, GridRowParams} from '@mui/x-data-grid-pro';
import CustomChip from 'src/@core/components/mui/chip';
import {useNavigate} from 'src/@prismafive/hooks/use-navigate';
import {IJogo} from '../jogos/types';

export function useJogarJogosTableConfig() {
  const {navigate} = useNavigate();

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
      {
        field: 'actions',
        headerName: 'Jogar',
        flex: 0.1,
        type: 'actions',
        getActions: (params: GridRowParams<IJogo>) => [
          <GridActionsCellItem
            label="Jogar"
            icon={<SportsEsportsIcon />}
            title={'Jogar'}
            onClick={() => navigate('jogos/jogar/', {id: params.row.id})}
          />,
        ],
      },
    ];
  }

  return {
    generateConfig,
  };
}
