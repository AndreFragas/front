import {useGenericModuleApi} from 'src/@prismafive/generics/module-api';
import {IPergunta} from './types';

export function usePerguntasModuleApi() {
  const genericApi = useGenericModuleApi<IPergunta>({ms: '', module: 'perguntas'});

  return {
    genericApi,
  };
}
