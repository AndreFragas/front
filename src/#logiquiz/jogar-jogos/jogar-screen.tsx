import {yupResolver} from '@hookform/resolvers/yup';
import {Grid, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {IPergunta} from 'src/#logiquiz/perguntas/types';
import {FormCard} from 'src/@prismafive/components/cards/form-card';
import {useNavigate} from 'src/@prismafive/hooks/use-navigate';
import {getLocalStorage} from 'src/@prismafive/storage-controler';
import {FormScreenProps} from 'src/@types/global-types';
import {useJogosModuleApi} from '../jogos/api';
import {IJogo} from '../jogos/types';
import {useJogarJogosModuleApi} from './api';
import {FasePerguntas} from './components/controlador-perguntas';
import {JogarJogosTimeline} from './components/jogar-jogos-time-line';
import {JogarJogosFormType, useJogarJogosFormConfig} from './form-config';
import {IJogarJogo} from './types';

export function JogarScreen(props: FormScreenProps) {
  const [jogo, setJogo] = useState<IJogo>();
  const [step, setStep] = useState<number>(0);
  const [perguntasFases, setPerguntasFases] = useState<{fase1: IPergunta[]; fase2: IPergunta[]; fase3: IPergunta[]}>({
    fase1: [],
    fase2: [],
    fase3: [],
  });
  const {schema, defaultValues} = useJogarJogosFormConfig();
  const {goBack} = useNavigate();
  const jogosApi = useJogosModuleApi();
  const jogarJogosApi = useJogarJogosModuleApi();
  const currentUser = getLocalStorage(window, 'userData');
  const fases = [perguntasFases.fase1, perguntasFases.fase2, perguntasFases.fase3];
  const [respostas, setRespostas] = useState<{pergunta_id: number; alternativa_id: number; fase_id: number}[]>([]);

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty, dirtyFields},
    reset,
    getValues,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    async function init() {
      if (props.id) {
        let jogo = await jogosApi.getById(props.id);
        setJogo(jogo);
        if (jogo) {
          setPerguntasFases({
            fase1: jogo.fases.find((x) => x.numero === 1)?.perguntas.map((x) => x.pergunta) ?? [],
            fase2: jogo.fases.find((x) => x.numero === 2)?.perguntas.map((x) => x.pergunta) ?? [],
            fase3: jogo.fases.find((x) => x.numero === 3)?.perguntas.map((x) => x.pergunta) ?? [],
          });
        }
        reset(jogo as any);
      }
    }

    init();
  }, []);

  async function onSubmit(data: JogarJogosFormType) {
  }

  function handleCompleteFase(respostasFase: {pergunta_id: number; alternativa_id: number}[]) {
    const respostasComFase = respostasFase.map((resposta) => ({
      ...resposta,
      fase_id: jogo?.fases.find((x) => x.numero === step + 1)?.id ?? 0,
    }));

    setRespostas((prevRespostas) => {
      const novasRespostas = [...prevRespostas, ...respostasComFase];

      if (step === 2) {
        handleSubmit(() => {
          const jogoData: IJogarJogo = {
            usuario_id: currentUser.id,
            jogo_id: jogo?.id,
            respostas: novasRespostas,
          };

          jogarJogosApi.salvarRespostas(jogoData, () => {
            goBack();
          });
        })();
      }
      return novasRespostas;
    });

    if (step !== 2) {
      setStep(step + 1);
    }
  }

  return (
    <FormCard title={props.title} goBackRoute="/jogo/jogos">
      <JogarJogosTimeline activeStep={step} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          {fases[step] && fases[step].length > 0 ? (
            <FasePerguntas perguntas={fases[step]} onComplete={handleCompleteFase} />
          ) : (
            <Typography variant="body1" color="error">
              Nenhuma pergunta disponível para esta fase.
            </Typography>
          )}
        </Grid>
      </form>
    </FormCard>
  );
}
