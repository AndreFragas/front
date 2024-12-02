import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Grid} from '@mui/material';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {FormCard} from 'src/@prismafive/components/cards/form-card';
import {GridRadioButton} from 'src/@prismafive/components/form-fields-with-grid/grid-radio-button';
import {GridTextBox} from 'src/@prismafive/components/form-fields-with-grid/grid-text-box';
import {Spacer} from 'src/@prismafive/components/spacer';
import {DefaultTable} from 'src/@prismafive/components/tables/default-table';
import {useToast} from 'src/@prismafive/components/toast';
import {onlyDirtFields} from 'src/@prismafive/helper/form-functions';
import {useNavigate} from 'src/@prismafive/hooks/use-navigate';
import {useStateWithHistory} from 'src/@prismafive/hooks/use-state-with-history';
import {FormScreenProps} from 'src/@types/global-types';
import {usePerguntasModuleApi} from './api';
import {usePerguntasTableConfig} from './config';
import {PerguntasFormType, usePerguntasFormConfig} from './form-config';
import {IAlternativas} from './types';

export function PerguntasScreen(props: FormScreenProps) {
  const [alternativas, setAlternativas] = useStateWithHistory<{values: Partial<IAlternativas>[]}>({
    values: [],
  });
  const {schema, defaultValues} = usePerguntasFormConfig();
  const {goBack} = useNavigate();
  const api = usePerguntasModuleApi();
  const toast = useToast();
  const config = usePerguntasTableConfig();

  useEffect(() => {
    async function init() {
      if (props.id) {
        let pergunta = await api.getById(props.id);
        reset(pergunta as any);
        setAlternativas({values: pergunta.alternativas});
      }
    }
    init();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {isDirty, dirtyFields},
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: any) {
    if (!isDirty) return toast.showErrorToast('global.errors.noEdit');
    let newData = onlyDirtFields<PerguntasFormType>(dirtyFields, data, ['dificuldade']);

    switch (props.type) {
      case 'create': {
        await api.create({...newData, alternativas: alternativas.values}, () => {
          toast.showSuccessToast('global.success.register');
          reset();
        });
        break;
      }
      case 'edit': {
        await api.edit({...newData, alternativas: alternativas.values}, () => {
          goBack();
          toast.showSuccessToast('global.success.edit');
        });
        break;
      }
    }
  }

  function deleteAlternativa(id: number) {
    setAlternativas((prevState: {values: Partial<IAlternativas>[]}) => ({
      values: prevState.values.filter((alternativa) => alternativa.id !== id),
    }));
  }

  function adicionarAlternativa() {
    setAlternativas((prevState: {values: Partial<IAlternativas>[]}) => ({
      values: [
        ...(prevState?.values || []),
        {
          id: prevState.values.length > 0 ? Math.max(...prevState.values.map((item) => item.id || 0)) + 1 : 1,
          texto: '',
          correta: false,
          pergunta_id: props.type === 'edit' && props.id ? parseInt(props.id.toString()) : undefined,
        } as Partial<IAlternativas>,
      ],
    }));
  }

  function editCorreta(id: number, value: any) {
    setAlternativas((prevState: {values: Partial<IAlternativas>[]}) => ({
      values: prevState.values.map((alternativa) => {
        if (alternativa.id === id) {
          return {...alternativa, correta: value};
        } else {
          return {...alternativa, correta: value ? false : alternativa.correta};
        }
      }),
    }));
  }

  function editTexto(id: number, value: string) {
    setAlternativas((prevState: {values: Partial<IAlternativas>[]}) => ({
      values: prevState.values.map((alternativa) =>
        alternativa.id === id ? {...alternativa, texto: value} : alternativa
      ),
    }));
  }

  return (
    <FormCard title={props.title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <GridTextBox fieldName="texto" label="Texto" control={control} formType={props.type} sm={9} rows={6} />
          <GridRadioButton
            fieldName="dificuldade"
            label="Dificuldade"
            control={control}
            formType={props.type}
            sm={3}
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
        </Grid>
        <Spacer label="Alternativas" marginTop={5} marginBottom={5} />
        {props.type !== 'details' && (
          <Grid container spacing={2} marginTop={5} marginLeft={1}>
            <Button variant="contained" onClick={adicionarAlternativa}>
              Adicionar Alternativa
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={12} marginTop={5}>
          <DefaultTable
            tableName="AlternativasCreate"
            data={alternativas?.values || []}
            columnDefinition={config.generateConfigAlternativas(deleteAlternativa, editCorreta, editTexto, props.type)}
            editMode="row"
            viewHeight="450px"
          />
        </Grid>
        <Grid container spacing={2} marginTop={8} marginLeft={1}>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Grid>
      </form>
    </FormCard>
  );
}
