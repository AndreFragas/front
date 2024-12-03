import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Grid} from '@mui/material';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {usePerguntasModuleApi} from 'src/#logiquiz/perguntas/api';
import {IPergunta} from 'src/#logiquiz/perguntas/types';
import {FormCard} from 'src/@prismafive/components/cards/form-card';
import {GridDropdown} from 'src/@prismafive/components/form-fields-with-grid/grid-dropdown';
import {GridRadioButton} from 'src/@prismafive/components/form-fields-with-grid/grid-radio-button';
import {GridTextField} from 'src/@prismafive/components/form-fields-with-grid/grid-text-field';
import {RowBoxSx} from 'src/@prismafive/components/shared-box-sx';
import {Spacer} from 'src/@prismafive/components/spacer';
import {DefaultTable} from 'src/@prismafive/components/tables/default-table';
import {useToast} from 'src/@prismafive/components/toast';
import {onlyDirtFields} from 'src/@prismafive/helper/form-functions';
import {useNavigate} from 'src/@prismafive/hooks/use-navigate';
import {getLocalStorage} from 'src/@prismafive/storage-controler';
import {FormScreenProps} from 'src/@types/global-types';
import {useJogosModuleApi} from '../api';
import {JogosTimeline} from '../components/timeline';
import {useJogosTableConfig} from '../config';
import {JogosFormType, useJogosFormConfig} from '../form-config';

export function JogosStep1Screen(props: FormScreenProps) {
  const [perguntasFase1, setPerguntasFase1] = useState<IPergunta[]>([]);
  const [perguntasFase2, setPerguntasFase2] = useState<IPergunta[]>([]);
  const [perguntasFase3, setPerguntasFase3] = useState<IPergunta[]>([]);
  const [step, setStep] = useState<number>(0);
  const [perguntas, setPerguntas] = useState<IPergunta[]>([]);
  const [perguntasFases, setPerguntasFases] = useState<{fase1: IPergunta[]; fase2: IPergunta[]; fase3: IPergunta[]}>({
    fase1: [],
    fase2: [],
    fase3: [],
  });
  const {schema, defaultValues} = useJogosFormConfig();
  const {goBack} = useNavigate();
  const api = useJogosModuleApi();
  const perguntasApi = usePerguntasModuleApi();
  const config = useJogosTableConfig();
  const toast = useToast();
  const currentUser = getLocalStorage(window, 'userData');

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
      setPerguntas(await perguntasApi.list());

      if (props.id) {
        let jogo = await api.getById(props.id);
        if (jogo) {
          setPerguntasFase1(jogo.fases.find((x) => x.numero === 1)?.perguntas.map((x) => x.pergunta) ?? []);
          setPerguntasFase2(jogo.fases.find((x) => x.numero === 2)?.perguntas.map((x) => x.pergunta) ?? []);
          setPerguntasFase3(jogo.fases.find((x) => x.numero === 3)?.perguntas.map((x) => x.pergunta) ?? []);
        }
        reset(jogo as any);
      }
    }

    init();
  }, []);

  async function onSubmit(data: JogosFormType) {
    switch (step) {
      case 1:
        setPerguntasFases((prev) => ({...prev, fase1: perguntasFase1}));
        setPerguntasFase1([]);
        break;
      case 2:
        setPerguntasFases((prev) => ({...prev, fase2: perguntasFase2}));
        setPerguntasFase2([]);
        break;
      case 3:
        setPerguntasFases((prev) => ({...prev, fase3: perguntasFase3}));
        setPerguntasFase3([]);
        break;
      default:
        break;
    }

    if (step === 3) {
      setPerguntasFases((prev) => ({...prev, fase3: perguntasFase3}));
      if (!isDirty) return toast.showErrorToast('global.errors.noEdit');
      let newData = onlyDirtFields<JogosFormType>(dirtyFields, data, ['dificuldade']);
      newData.fase1 = perguntasFases.fase1.map((x) => x.id);
      newData.fase2 = perguntasFases.fase2.map((x) => x.id);
      newData.fase3 = perguntasFase3.map((x) => x.id);
      delete newData.perguntas;
      newData.professor_id = currentUser.id;

      switch (props.type) {
        case 'create': {
          await api.create({...newData}, () => {
            toast.showSuccessToast('global.success.register');
            reset();
            goBack();
            setPerguntasFases({fase1: [], fase2: [], fase3: []});
          });
          break;
        }
        case 'edit': {
          await api.edit({...newData}, () => {
            goBack();
            toast.showSuccessToast('global.success.edit');
          });
          break;
        }
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  }

  function AtualizaBotãoProximaEtapa() {
    switch (step) {
      case 0:
        return getValues('nome') === '';
      case 1:
        return perguntasFase1.length < 3;
      case 2:
        return perguntasFase2.length < 3;
      case 3:
        return perguntasFase3.length < 3 || props.type === 'details';
      default:
        return true;
    }
  }

  function adicionarPergunta(value: IPergunta, step: number) {
    switch (step) {
      case 1:
        let isExist1 = perguntasFase1.find((x) => x.id === value.id);
        if (!isExist1) setPerguntasFase1((prev) => [...prev, value]);
        break;
      case 2:
        let isExist2 = perguntasFase2.find((x) => x.id === value.id);
        if (!isExist2) setPerguntasFase2((prev) => [...prev, value]);
        break;
      case 3:
        let isExist3 = perguntasFase3.find((x) => x.id === value.id);
        if (!isExist3) setPerguntasFase3((prev) => [...prev, value]);
        break;
      default:
        break;
    }
  }

  function getPerguntasStep() {
    switch (step) {
      case 1:
        return perguntasFase1;
      case 2:
        return perguntasFase2;
      case 3:
        return perguntasFase3;
      default:
        break;
    }
  }

  function removerPergunta(id: number) {
    switch (step) {
      case 1:
        setPerguntasFase1((prev) => prev.filter((x) => x.id !== id));
        break;
      case 2:
        setPerguntasFase2((prev) => prev.filter((x) => x.id !== id));
        break;
      case 3:
        setPerguntasFase3((prev) => prev.filter((x) => x.id !== id));
        break;
      default:
        break;
    }
  }

  return (
    <FormCard title={props.title} goBackRoute="/cadastros/jogos">
      <JogosTimeline activeStep={step} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          {step === 0 && (
            <>
              <GridTextField fieldName="nome" label="Nome" control={control} formType={props.type} sm={6} />
              <GridRadioButton
                fieldName="dificuldade"
                label="Dificuldade"
                control={control}
                formType={props.type}
                sm={6}
                row
                options={[
                  {
                    value: 1,
                    label: 'Fácil',
                  },
                  {
                    value: 2,
                    label: 'Médio',
                  },
                  {
                    value: 3,
                    label: 'Difícil',
                  },
                ]}
              />
              <GridTextField fieldName="descricao" label="Descrição" control={control} formType={props.type} sm={12} />
            </>
          )}
          {step !== 0 && (
            <>
              {props.type === 'create' && (
                <GridDropdown
                  control={control}
                  fieldName={'perguntas'}
                  sm={12}
                  filterBy={'texto'}
                  options={perguntas}
                  label="Selecione uma pergunta"
                  additionalOnChange={(value) => adicionarPergunta(value, step)}
                />
              )}
              <Spacer label="Perguntas Selecionadas" marginTop={5} marginBottom={5} />
              <DefaultTable
                columnDefinition={config.perguntasFaseConfig(removerPergunta, props.type)}
                data={getPerguntasStep()}
                getRowId={(value) => value.id}
                viewHeight={400}
              />
            </>
          )}
        </Grid>
        <Box sx={{...RowBoxSx, justifyContent: 'flex-end', alignItems: 'center', marginTop: 5}}>
          <Button type="submit" variant="contained" disabled={AtualizaBotãoProximaEtapa()}>
            {step === 3 ? 'Finalizar' : 'Próxima Etapa'}
          </Button>
        </Box>
      </form>
    </FormCard>
  );
}
