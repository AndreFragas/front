import {Icon} from '@iconify/react';
import {Box, Card, CardContent, CardHeader, InputAdornment, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import {DefaultTable} from 'src/@prismafive/components/tables/default-table';
import {removerAcentos} from 'src/@prismafive/helper/remover-acento';
import {useTranslate} from 'src/@prismafive/hooks/use-translate';
import {useAlunosModuleApi} from './api';
import {useAlunosTableConfig} from './config';
import {IAluno} from './types';

export function AlunosListScreen() {
  const [alunos, setAlunos] = useState<IAluno[]>([]);
  const [search, setSearch] = useState('');
  const {translate} = useTranslate();
  const config = useAlunosTableConfig();
  const api = useAlunosModuleApi();

  async function init() {
    const alunos = await api.list();
    if (alunos) setAlunos(alunos);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 5,
          maxHeight: 40,
          marginTop: 5,
        }}
      >
        <CardHeader title={'Alunos'} />
      </Box>
      <CardContent>
        <TextField
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={translate('components.defaultTable.placeholder')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="octicon:search-24" />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{marginBottom: 5}}
        />
        <DefaultTable
          columnDefinition={config.generateConfig()}
          data={alunos.filter((alunos) => {
            const cleanSearch = removerAcentos(search.toLowerCase());
            const valor1 = removerAcentos(alunos.nome.toLowerCase());
            return valor1.includes(cleanSearch);
          })}
          getRowId={(value) => value.id}
          materialUiPagination
        />
      </CardContent>
    </Card>
  );
}
