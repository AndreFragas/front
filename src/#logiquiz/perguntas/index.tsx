import {Can, useAbility} from '@casl/react';
import {Icon} from '@iconify/react';
import {Box, Button, Card, CardContent, CardHeader, InputAdornment, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import {DefaultTable} from 'src/@prismafive/components/tables/default-table';
import {removerAcentos} from 'src/@prismafive/helper/remover-acento';
import {useTranslate} from 'src/@prismafive/hooks/use-translate';
import {AbilityContext} from 'src/layouts/components/acl/Can';
import {usePerguntasModuleApi} from './api';
import {usePerguntasTableConfig} from './config';
import {IPergunta} from './types';

export function PerguntasListScreen() {
  const [perguntas, setPerguntas] = useState<IPergunta[]>([]);
  const [search, setSearch] = useState('');
  const {translate} = useTranslate();
  const config = usePerguntasTableConfig();
  const abilities = useAbility(AbilityContext);
  const api = usePerguntasModuleApi();

  async function init() {
    const perguntas = await api.list();
    if (perguntas) setPerguntas(perguntas);
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
        <CardHeader title={'Perguntas'} />

        <Can I={'create'} a={'Cadastros.Perguntas'} ability={abilities}>
          <Button variant="contained" onClick={() => console.log('')}>
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
          data={perguntas.filter((pergunta) => {
            const cleanSearch = removerAcentos(search.toLowerCase());
            const valor1 = removerAcentos(pergunta.texto.toLowerCase());
            return valor1.includes(cleanSearch);
          })}
          getRowId={(value) => value.id}
          materialUiPagination
        />
      </CardContent>
    </Card>
  );
}
