import {useGenericModuleApi} from 'src/@prismafive/generics/module-api';
import { IJogo } from './types';

export function useJogosModuleApi() {
  const genericApi = useGenericModuleApi<IJogo>({ ms: '', module: 'jogos'});

  return {
    genericApi,
  };
}
