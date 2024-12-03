import {Typography} from '@mui/material';
import {DefaultModalGeneric} from 'src/@prismafive/components/modals/default-modal-generic';

interface ModalResultadoProps {
  onClose: () => void;
  show: boolean;
  acertos: number;
  total: number;
}

export function Modalresultado({onClose, show, acertos, total}: ModalResultadoProps) {
  return (
    <DefaultModalGeneric onClose={onClose} show={show} title={'Resultado'} maxWidth="xs">
      <Typography fontSize={20} sx={{marginBottom: 3}}>{`Acertos: ${acertos} de ${total}`}</Typography>
    </DefaultModalGeneric>
  );
}
