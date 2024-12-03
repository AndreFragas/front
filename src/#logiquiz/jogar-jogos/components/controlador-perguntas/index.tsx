import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IPergunta } from 'src/#logiquiz/perguntas/types';
import { FasePerguntasProps } from './types';

export function FasePerguntas({ perguntas, onComplete }: FasePerguntasProps) {
  const [index, setIndex] = useState<number>(0);
  const [perguntaAtual, setPerguntaAtual] = useState<IPergunta>(perguntas[index]);
  const [respostas, setRespostas] = useState<{ pergunta_id: number; alternativa_id: number }[]>([]);
  const [faseCompletada, setFaseCompletada] = useState<boolean>(false);

  useEffect(() => {
    if (perguntas.length > 0) {
      setPerguntaAtual(perguntas[index]);
    }
    setIndex(0);
    setRespostas([]);
    setFaseCompletada(false);
    console.log(perguntas);
  }, [perguntas]);

  useEffect(() => {
    setPerguntaAtual(perguntas[index]);
  }, [index]);

  function avancar() {
    if (index < perguntas.length - 1) {
      setIndex(index + 1);
    } else {
      setFaseCompletada(true);
    }
  }

  function voltar() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function validarResposta() {
    const hasResposta = respostas.find((x) => x.pergunta_id === perguntaAtual.id);
    return hasResposta ? hasResposta.alternativa_id.toString() : '';
  }

  function finalizarFase() {
    onComplete(respostas);
  }

  function handleRespostaChange(pergunta_id: number, value: any) {
    const hasResposta = respostas.find((x) => x.pergunta_id === pergunta_id);

    if (hasResposta) {
      setRespostas((prevRespostas) =>
        prevRespostas.map((resposta) =>
          resposta.pergunta_id === pergunta_id
            ? { ...resposta, alternativa_id: parseInt(value) }
            : resposta
        )
      );
    } else {
      setRespostas((prevRespostas) => [...prevRespostas, { pergunta_id, alternativa_id: parseInt(value) }]);
    }
  }

  return (
    <Grid container spacing={4} direction="column" alignItems="center" marginTop={5}>
      <Typography variant="h6">{perguntaAtual?.texto}</Typography>

      <RadioGroup value={validarResposta()} onChange={(e) => handleRespostaChange(perguntaAtual.id, e.target.value)}>
        {perguntaAtual.alternativas.map((alt) => (
          <FormControlLabel key={alt.id} value={alt.id.toString()} control={<Radio />} label={alt.texto} />
        ))}
      </RadioGroup>

      <Grid item>
        <Button variant="contained" onClick={voltar} disabled={index === 0} sx={{ marginRight: 5 }}>
          Voltar
        </Button>

        <Button variant="contained" onClick={avancar} disabled={validarResposta() === ''}>
          Próxima Pergunta
        </Button>
      </Grid>

      {faseCompletada && (
        <Grid item>
          <Button variant="contained" onClick={finalizarFase}>
            Finalizar Fase
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
