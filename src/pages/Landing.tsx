import { CSSProperties } from 'react';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import '../config/i18n';
import { useTranslation } from 'react-i18next';

const landingCSS: CSSProperties = {
  textAlign: 'center',
  padding: '2%',
  margin: '11% 32%',
  borderRadius: '8px',
  fontFamily: 'gameria',
  opacity: '0.9',
  backgroundColor: '#a3d2ca'
};

function Landing() {
  const { t } = useTranslation();

  return (
    <>
      <div style={landingCSS}>
        <div style={{ fontSize: '3em' }}>{t('landing.CITADINE_PUZZLE')}</div>
        <Divider
          style={{ marginInline: '15%', backgroundColor: 'black' }}
          variant="middle"
        />
        <p
          style={{
            marginTop: '20px',
            fontSize: '2em'
          }}
        >
          {t('landing.WELCOME')}
        </p>
        <p
          style={{
            marginTop: '10px',
            fontSize: '1.5em'
          }}
        >
          {t('landing.HAVE_FUN')}
          <br />
          <br />
          {t('landing.HAVE_FUN_2')}
        </p>
        <Button
          href="/juego"
          variant="contained"
          style={{
            marginTop: '10px',
            fontFamily: 'gameria',
            fontSize: '1.8em',
            backgroundColor: '#81b214'
          }}
        >
          {t('landing.CONTINUE')}
        </Button>
      </div>
    </>
  );
}

export default Landing;
