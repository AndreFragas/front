import { Box, Button, Grid } from '@mui/material';
import { FormCard } from 'src/@prismafive/components/cards/form-card';
import {FormScreenProps} from 'src/@types/global-types';
import { JogosTimeline } from '../components/timeline';
import { RowBoxSx } from 'src/@prismafive/components/shared-box-sx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useJogosFormConfig } from '../form-config';

export function JogosStep1Screen(props: FormScreenProps) {
  const { schema, defaultValues} = useJogosFormConfig();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields},
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  })

  useEffect(() => {

  }, )

  async function onSubmit() {

  }

  return (
    <FormCard title={props.title} goBackRoute="/jogos">
      <JogosTimeline activeStep={0} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          
        </Grid>
        <Box sx={{...RowBoxSx, justifyContent: 'flex-end', alignItems: 'center', marginTop: 5}}>
          <Button type="submit" variant="contained">
            Próxima Etapa
          </Button>
        </Box>
      </form>
    </FormCard>
  );
}
