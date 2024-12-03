import Avatar from '@mui/material/Avatar';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import {Theme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import {useSettings} from 'src/@core/hooks/useSettings';
import StepperWrapper from 'src/@core/styles/mui/stepper';
import {hexToRGBA} from 'src/@core/utils/hex-to-rgba';
import {Spacer} from 'src/@prismafive/components/spacer';
import {useStepsConfig} from './steps-config';
import { JogosTimeLineProps } from 'src/#logiquiz/jogos/components/timeline/types';
import StepperCustomDot from 'src/#logiquiz/jogos/components/timeline/stepper-custom-dot';
import { Step } from '@mui/material';

export function JogarJogosTimeline(props: JogosTimeLineProps) {
  const {steps} = useStepsConfig();
  const {settings} = useSettings();
  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const {direction} = settings;

  return (
    <StepperWrapper>
      <Stepper
        activeStep={props.activeStep}
        connector={
          !smallScreen ? <Icon icon={direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'} /> : null
        }
      >
        {steps.map((step, index) => {
          const RenderAvatar = props.activeStep >= index ? CustomAvatar : Avatar;

          return (
            <Step key={index}>
              <StepLabel StepIconComponent={StepperCustomDot}>
                <div className="step-label">
                  <RenderAvatar
                    variant="rounded"
                    {...(props.activeStep >= index && {skin: 'light'})}
                    {...(props.activeStep === index && {skin: 'filled'})}
                    {...(props.activeStep >= index && {color: 'primary'})}
                    sx={{
                      ...(props.activeStep === index && {boxShadow: (theme) => theme.shadows[3]}),
                      ...(props.activeStep > index && {color: (theme) => hexToRGBA(theme.palette.primary.main, 0.4)}),
                    }}
                  >
                    <Icon icon={step.icon} />
                  </RenderAvatar>
                  <div>
                    <Typography className="step-title">{step.title}</Typography>
                    <Typography className="step-subtitle">{step.subtitle}</Typography>
                  </div>
                </div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Spacer marginBottom={5} marginTop={5} />
    </StepperWrapper>
  );
}
