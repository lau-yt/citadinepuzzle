import Divider from '@material-ui/core/Divider';
import HelpModal from './HelpModal';
import { CSSProperties } from 'react';
import { Button } from '@material-ui/core';
import Switch from 'react-switch';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

import '../config/i18n';
import { useTranslation } from 'react-i18next';

type InicioProps = {
  showNumbers: boolean;
  dificultad: string;
  contraste: string;
  onSwitchChange: () => void;
  changeDificultad: (item: string) => void;
  changeContraste: (item: string) => void;
  onStart: () => void;
  boardSize: number;
  zoom: number;
  handleZoomInClick: () => void;
  handleZoomOutClick: () => void;
};

const inicioCSS: CSSProperties = {
  textAlign: 'center',
  padding: '2%',
  margin: '0 auto',
  borderRadius: '8px',
  fontFamily: 'gameria',
  opacity: '0.95'
};
const inicioBajoCSS: CSSProperties = {
  ...inicioCSS,
  backgroundColor: '#a3d2ca'
};
const inicioAltoCSS: CSSProperties = {
  ...inicioCSS,
  backgroundColor: '#EEEEEE'
};
const itemConfigCSS: CSSProperties = {
  textAlign: 'center',
  padding: '2%',
  margin: '2% 0',
  borderRadius: '8px',
  fontFamily: 'gameria',
  backgroundColor: '#e7d4b5'
};
const itemConfigBajoCSS: CSSProperties = {
  ...itemConfigCSS,
  backgroundColor: '#e7d4b5'
};
const itemConfigAltoCSS: CSSProperties = {
  ...itemConfigCSS,
  backgroundColor: '#000000'
};
const buttonGroupCSS: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '2%'
};
const buttonBajoCSS: CSSProperties = {
  fontSize: '1.3em',
  fontFamily: 'gameria',
  backgroundColor: '#ca8a8b'
};
const buttonAltoCSS: CSSProperties = {
  fontSize: '1.3em',
  fontFamily: 'gameria',
  backgroundColor: '#FFDDCC'
};
const contrasteButtonBajoCSS: CSSProperties = {
  fontSize: '1.3em',
  fontFamily: 'gameria',
  paddingInline: '60px',
  backgroundColor: '#ca8a8b'
};
const contrasteButtonAltoCSS: CSSProperties = {
  fontSize: '1.3em',
  fontFamily: 'gameria',
  paddingInline: '60px',
  backgroundColor: '#FFDDCC'
};

function DificultadTooltip() {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip
        arrow
        leaveDelay={300}
        style={{ fontSize: '1em' }}
        title={
          <h1 style={{ padding: '2px', fontSize: '1.4em' }}>
            {t('start.DIFFICULTY_HELP_1')}
            <br />
            {t('start.DIFFICULTY_HELP_2')}: 4 <br />
            {t('start.DIFFICULTY_HELP_3')}: 8 <br />
            {t('start.DIFFICULTY_HELP_4')}: 16
          </h1>
        }
      >
        <InfoIcon
          style={{ marginTop: '0px', marginLeft: '5px', fontSize: '1em' }}
        />
      </Tooltip>
    </>
  );
}

function ShowNumbersTooltip() {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip
        arrow
        leaveDelay={300}
        style={{ fontSize: '1em' }}
        title={
          <h1 style={{ padding: '2px', fontSize: '1.4em' }}>
            {t('start.SHOW_NUMBER_HELP')}
          </h1>
        }
      >
        <InfoIcon
          style={{ marginTop: '0px', marginLeft: '5px', fontSize: '1em' }}
        />
      </Tooltip>
    </>
  );
}

function ContrasteTooltip() {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip
        arrow
        leaveDelay={300}
        style={{ fontSize: '1em' }}
        title={
          <h1 style={{ padding: '2px', fontSize: '1.4em' }}>
            {t('start.CONTRAST_HELP')}
          </h1>
        }
      >
        <InfoIcon
          style={{ marginTop: '0px', marginLeft: '5px', fontSize: '1em' }}
        />
      </Tooltip>
    </>
  );
}

function MedidaTooltip() {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip
        arrow
        leaveDelay={300}
        style={{ fontSize: '1em' }}
        title={
          <h1 style={{ padding: '2px', fontSize: '1.4em' }}>
            {t('start.SIZE_HELP')}
          </h1>
        }
      >
        <InfoIcon
          style={{ marginTop: '0px', marginLeft: '5px', fontSize: '1em' }}
        />
      </Tooltip>
    </>
  );
}

function Inicio(props: InicioProps) {
  const {
    showNumbers,
    onSwitchChange,
    onStart,
    dificultad,
    changeDificultad,
    contraste,
    changeContraste,
    boardSize,
    zoom,
    handleZoomInClick,
    handleZoomOutClick
  } = props;
  const { t } = useTranslation();

  const onChangeDificultad = (selected: string) => {
    changeDificultad(selected);
  };

  const onChangeContraste = (selected: string) => {
    changeContraste(selected);
  };

  return (
    <>
      <div
        style={{
          ...(contraste === 'bajo' ? inicioBajoCSS : inicioAltoCSS),
          width: boardSize
        }}
      >
        <div
          style={contraste === 'bajo' ? itemConfigBajoCSS : itemConfigAltoCSS}
        >
          <div
            style={{
              textAlign: 'center',
              marginTop: '5px',
              fontSize: '1.9em',
              color: contraste === 'bajo' ? 'black' : '#EDEDED'
            }}
          >
            {t('start.DIFFICULTY')}
            {DificultadTooltip()}
          </div>
          <div style={buttonGroupCSS}>
            <Button
              onClick={() => onChangeDificultad('facil')}
              variant="contained"
              disabled={dificultad === 'facil'}
              style={contraste === 'bajo' ? buttonBajoCSS : buttonAltoCSS}
            >
              {t('start.EASY')}
            </Button>
            <Button
              onClick={() => onChangeDificultad('medio')}
              variant="contained"
              disabled={dificultad === 'medio'}
              style={contraste === 'bajo' ? buttonBajoCSS : buttonAltoCSS}
            >
              {t('start.MEDIUM')}
            </Button>
            <Button
              onClick={() => onChangeDificultad('dificil')}
              variant="contained"
              disabled={dificultad === 'dificil'}
              style={contraste === 'bajo' ? buttonBajoCSS : buttonAltoCSS}
            >
              {t('start.HARD')}
            </Button>
          </div>
        </div>
        <div
          style={contraste === 'bajo' ? itemConfigBajoCSS : itemConfigAltoCSS}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.9em',
              color: contraste === 'bajo' ? 'black' : '#EDEDED'
            }}
          >
            {t('start.SHOW_NUMBER')}
            {ShowNumbersTooltip()}
          </div>
          <Switch onChange={onSwitchChange} checked={showNumbers} />
        </div>
        <div
          style={contraste === 'bajo' ? itemConfigBajoCSS : itemConfigAltoCSS}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.9em',
              color: contraste === 'bajo' ? 'black' : '#EDEDED'
            }}
          >
            {t('start.CONTRAST')}
            {ContrasteTooltip()}
          </div>
          <div style={buttonGroupCSS}>
            <Button
              onClick={() => onChangeContraste('bajo')}
              variant="contained"
              style={
                contraste === 'bajo'
                  ? contrasteButtonBajoCSS
                  : contrasteButtonAltoCSS
              }
              disabled={contraste === 'bajo'}
            >
              {t('start.LOW')}
            </Button>
            <Button
              onClick={() => onChangeContraste('alto')}
              variant="contained"
              style={
                contraste === 'bajo'
                  ? contrasteButtonBajoCSS
                  : contrasteButtonAltoCSS
              }
              disabled={contraste === 'alto'}
            >
              {t('start.HIGH')}
            </Button>
          </div>
        </div>
        <div
          style={contraste === 'bajo' ? itemConfigBajoCSS : itemConfigAltoCSS}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.9em',
              color: contraste === 'bajo' ? 'black' : '#EDEDED'
            }}
          >
            {t('start.SIZE')}
            {MedidaTooltip()}
          </div>
          <div style={buttonGroupCSS}>
            <Button
              onClick={handleZoomOutClick}
              variant="contained"
              disabled={zoom < 1}
              style={
                contraste === 'bajo'
                  ? contrasteButtonBajoCSS
                  : contrasteButtonAltoCSS
              }
            >
              {t('start.REDUCE')}
            </Button>
            <Button
              onClick={handleZoomInClick}
              variant="contained"
              disabled={zoom > 7}
              style={
                contraste === 'bajo'
                  ? contrasteButtonBajoCSS
                  : contrasteButtonAltoCSS
              }
            >
              {t('start.ENLARGE')}
            </Button>
          </div>
        </div>
        <Divider
          style={{
            marginInline: '10%',
            backgroundColor: 'black',
            height: '2px',
            marginBottom: '5%',
            marginTop: '5%'
          }}
          variant="middle"
        />
        <div>
          <HelpModal fontSize={'1.2em'} />
          <Button
            onClick={onStart}
            variant="contained"
            style={{
              marginTop: '5%',
              backgroundColor: '#81b214',
              textAlign: 'center',
              fontSize: '1.8em',
              paddingInline: '10%',
              fontFamily: 'gameria'
            }}
          >
            {t('start.START')}
          </Button>
        </div>
      </div>
    </>
  );
}
export default Inicio;
