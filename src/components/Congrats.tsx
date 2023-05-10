import { CSSProperties } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import images from './images';

import '../config/i18n';
import { useTranslation } from 'react-i18next';

type CongratsProps = {
  nextPuzzle: () => void;
  imageIndex: number;
  contraste: string;
};
const congratsBajoCSS: CSSProperties = {
  textAlign: 'center',
  padding: '1%',
  margin: '2% 20%',
  borderRadius: '8px',
  fontFamily: 'gameria',
  backgroundColor: '#a3d2ca'
};

const congratsAltoCSS: CSSProperties = {
  textAlign: 'center',
  padding: '1%',
  margin: '2% 20%',
  borderRadius: '8px',
  fontFamily: 'gameria',
  backgroundColor: '#EEEEEE'
};

const contentCSS: CSSProperties = {
  textAlign: 'center',
  padding: '2%',
  margin: '2% 3%',
  borderRadius: '8px',
  fontFamily: 'gameria',
  backgroundColor: '#e7d4b5'
};

const actionsButtonsCSS: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1%',
  margin: '2%',
  fontFamily: 'gameria',
  fontSize: '0.4em'
};

function Congrats(props: CongratsProps) {
  const { nextPuzzle, imageIndex, contraste } = props;
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <div style={contraste === 'bajo' ? congratsBajoCSS : congratsAltoCSS}>
        <h1>
          {t('images.title.' + images[imageIndex].name) +
            ' ' +
            t('congrats.UNBLOCKED')}
          !!!
        </h1>
        <div style={contentCSS}>
          <p>{t('images.text.' + images[imageIndex].name)}</p>
          <ReactPlayer
            url={t('images.video.' + images[imageIndex].name)}
            width="100%"
            height="400px"
          />
        </div>
        <div style={actionsButtonsCSS}>
          <Button
            onClick={() => history.push('/')}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: 'red',
              fontSize: '2.8em',
              fontFamily: 'gameria'
            }}
          >
            {t('congrats.EXIT')}
          </Button>

          <Button
            onClick={() => nextPuzzle()}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: 'green',
              fontSize: '2.8em',
              fontFamily: 'gameria'
            }}
          >
            {t('congrats.NEXT')}
          </Button>
        </div>
      </div>
    </>
  );
}
export default Congrats;
