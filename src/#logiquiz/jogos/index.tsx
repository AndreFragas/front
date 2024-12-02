import {Can, useAbility} from '@casl/react';
import {Icon} from '@iconify/react';
import {Box, Button, Card, CardContent, CardHeader, InputAdornment, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import {DefaultTable} from 'src/@prismafive/components/tables/default-table';
import {removerAcentos} from 'src/@prismafive/helper/remover-acento';
import {useNavigate} from 'src/@prismafive/hooks/use-navigate';
import {useTranslate} from 'src/@prismafive/hooks/use-translate';
import {AbilityContext} from 'src/layouts/components/acl/Can';
import {useJogosModuleApi} from './api';
import {useJogosTableConfig} from './config';
import {IJogo} from './types';

export function JogosListScreen() {
  const [jogos, setJogos] = useState<IJogo[]>([]);
  const [search, setSearch] = useState('');
  const {translate} = useTranslate();
  const config = useJogosTableConfig();
  const abilities = useAbility(AbilityContext);
  const api = useJogosModuleApi();
  const navigate = useNavigate();

  async function init() {
    const jogos = await api.list();
    if (jogos) setJogos(jogos);
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
        <CardHeader title={'Jogos'} />

        <Can I={'create'} a={'Cadastros.Jogos'} ability={abilities}>
          <Button variant="contained" onClick={() => navigate.navigate('jogos/create')}>
            Incluir
          </Button>
        </Can>
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
          data={jogos.filter((jogos) => {
            const cleanSearch = removerAcentos(search.toLowerCase());
            const valor1 = removerAcentos(jogos.descricao.toLowerCase());
            return valor1.includes(cleanSearch);
          })}
          getRowId={(value) => value.id}
          materialUiPagination
        />
      </CardContent>
    </Card>
  );
}
