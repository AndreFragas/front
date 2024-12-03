import {useGenericModuleApi} from 'src/@prismafive/generics/module-api';
import {useApi} from 'src/@prismafive/hooks/use-api';
import {IJogarJogo} from './types';

export function useJogarJogosModuleApi() {
  const genericApi = useGenericModuleApi<IJogarJogo>({ms: '', module: 'jogar-jogo'});
  const salvarRespostasService = useApi('POST', '/api/jogos/salvar-respostas');

  async function salvarRespostas(data: IJogarJogo, onSuccess?: () => void) {
    return await salvarRespostasService.fetch({dynamicParams: data, dynamicOnSuccess: onSuccess});
  }

  return {
    ...genericApi,
    salvarRespostas,
  };
}
