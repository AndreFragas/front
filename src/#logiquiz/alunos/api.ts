import {useGenericModuleApi} from 'src/@prismafive/generics/module-api';
import {IAluno} from './types';

export function useAlunosModuleApi() {
  const genericApi = useGenericModuleApi<IAluno>({ms: '', module: 'alunos'});

  return {
    ...genericApi,
  };
}
