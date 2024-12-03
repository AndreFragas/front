import {yupResolver} from '@hookform/resolvers/yup';
import {Grid} from '@mui/material';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {FormCard} from 'src/@prismafive/components/cards/form-card';
import {GridTextField} from 'src/@prismafive/components/form-fields-with-grid/grid-text-field';
import {FormScreenProps} from 'src/@types/global-types';
import {useAlunosModuleApi} from './api';
import {useAlunosFormConfig} from './form-config';

export function AlunosScreen(props: FormScreenProps) {
  const {schema, defaultValues} = useAlunosFormConfig();
  const api = useAlunosModuleApi();

  useEffect(() => {
    async function init() {
      if (props.id) {
        let aluno = await api.getById(props.id);
        reset(aluno as any);
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

  async function onSubmit(data: any) {}

  return (
    <FormCard title={props.title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <GridTextField fieldName="nome" label="Nome" control={control} formType={props.type} sm={6} />
          <GridTextField fieldName="email" label="E-mail" control={control} formType={props.type} sm={6} />
        </Grid>
      </form>
    </FormCard>
  );
}
