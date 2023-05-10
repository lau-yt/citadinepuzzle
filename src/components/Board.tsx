import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { useState, CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import HelpModal from './HelpModal';
import Tile from './Tile';
import CachedIcon from '@material-ui/icons/Cached';
import FastForwardIcon from '@material-ui/icons/FastForward';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import VerImagen from './VerImagen';
import images from './images';

import '../config/i18n';
import { useTranslation } from 'react-i18next';

type BoardProps = {
  boardSize: number;
  zoom: number;
  gridSize: number;
  showNumbers: boolean;
  isStarted: boolean;
  onStart: () => void;
  imgUrl: string;
  contraste: string;
  nextImageHanlder: () => void;
  setIsFinished: (isFinished: boolean) => void;
  imageIndex: number;
  handleZoomInClick: () => void;
  handleZoomOutClick: () => void;
};

const boardCSS: CSSProperties = {
  textAlign: 'center',
  padding: '2%',
  margin: '0 auto',
  borderRadius: '8px',
  fontFamily: 'gameria'
};

const boardBajoCSS: CSSProperties = {
  ...boardCSS,
  backgroundColor: '#a3d2ca'
};

const boardAltoCSS: CSSProperties = {
  ...boardCSS,
  backgroundColor: '#EDEDED'
};

const actionsImageCSS: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '0',
  margin: '2% 0',
  fontFamily: 'gameria',
  fontSize: '0.4em'
};

function Board(props: BoardProps) {
  const {
    boardSize,
    zoom,
    gridSize,
    showNumbers,
    isStarted,
    imgUrl,
    contraste,
    nextImageHanlder,
    setIsFinished,
    imageIndex,
    handleZoomInClick,
    handleZoomOutClick
  } = props;
  const [tiles, setTiles] = useState([...Array(gridSize * gridSize).keys()]);
  const [pieceSize, setPieceSize] = useState(Math.round(boardSize / gridSize));
  const [firstTime, setFirstTime] = useState(true);
  const history = useHistory();
  const { t } = useTranslation();

  function isSolvable(tiles: number[]) {
    let product = 1;
    for (let i = 1, l = gridSize * gridSize - 1; i <= l; i++) {
      for (let j = i + 1, m = l + 1; j <= m; j++) {
        product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
      }
    }
    return Math.round(product) === 1;
  }

  function isSolved(tiles: number[]) {
    for (let i = 0, l = tiles.length; i < l; i++) {
      if (tiles[i] !== i) {
        return false;
      }
    }
    return true;
  }

  function shuffle(tiles: number[]): number[] {
    const shuffledTiles = [
      ...tiles
        .filter(t => t !== tiles.length - 1)
        .sort(() => Math.random() - 0.5),
      tiles.length - 1
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
      ? shuffledTiles
      : shuffle(shuffledTiles);
  }

  function canSwap(srcIndex: number, destIndex: number) {
    const { row: srcRow, col: srcCol } = {
      row: Math.floor(srcIndex / gridSize),
      col: srcIndex % gridSize
    };
    const { row: destRow, col: destCol } = {
      row: Math.floor(destIndex / gridSize),
      col: destIndex % gridSize
    };
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
  }

  function swap(tiles: number[], src: number, dest: number) {
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [
      tilesResult[dest],
      tilesResult[src]
    ];
    return tilesResult;
  }

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex: number) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);

      // Si el juego inició y esta resuelto muestro el texto final
      if (isStarted && isSolved(swappedTiles)) {
        setTimeout(() => {
          setIsFinished(true);
        }, 3000);
      }
    }
  };

  const handleTileClick = (index: number) => {
    swapTiles(index);
  };

  const handleShuffleClick = () => {
    shuffleTiles();
  };

  useEffect(() => {
    setPieceSize(Math.round(boardSize / gridSize));
    setTiles([...Array(gridSize * gridSize).keys()]);
  }, [boardSize, gridSize]);

  useEffect(() => {
    shuffleTiles();
    // eslint-disable-next-line
  }, [boardSize]);

  if (firstTime) {
    setTimeout(() => {
      handleShuffleClick();
    }, 2000);
    setFirstTime(false);
  }

  return (
    <>
      <div
        style={{
          ...(contraste === 'bajo' ? boardBajoCSS : boardAltoCSS),
          width: boardSize
        }}
      >
        <h1>{t('images.title.' + images[imageIndex].name)}</h1>
        <Divider
          style={{
            marginInline: '10%',
            backgroundColor: 'black',
            marginBottom: '3%'
          }}
          variant="middle"
        />
        <div
          style={{
            textAlign: 'center'
          }}
        >
          <ul
            style={{
              width: boardSize,
              height: boardSize,
              textAlign: 'center',
              margin: 'auto',
              borderRadius: '5px',
              border: contraste === 'bajo' ? 'solid white' : 'solid black'
            }}
            className="board"
          >
            {tiles.map((tile, index) => (
              <Tile
                key={tile}
                index={index}
                imgUrl={imgUrl}
                tile={tile}
                width={pieceSize}
                height={pieceSize}
                handleTileClick={handleTileClick}
                boardSize={boardSize}
                gridSize={gridSize}
                showNumbers={showNumbers}
                isSolved={isStarted && isSolved(tiles)}
              />
            ))}
          </ul>
        </div>
        <div style={actionsImageCSS}>
          <Button
            onClick={handleShuffleClick}
            variant="contained"
            style={{
              fontSize: '2.2em',
              fontFamily: 'gameria',
              backgroundColor: contraste === 'bajo' ? '#1768AC' : 'black'
            }}
            color="primary"
          >
            {t('board.SHUFFLE')}
            <CachedIcon
              style={{
                fontSize: '2em',
                fontFamily: 'gameria',
                paddingLeft: '2px'
              }}
            />
          </Button>
          <Button
            onClick={nextImageHanlder}
            variant="contained"
            style={{
              fontSize: '2.2em',
              fontFamily: 'gameria',
              backgroundColor: contraste === 'bajo' ? '#1768AC' : 'black'
            }}
            color="primary"
          >
            {t('board.NEXT')}
            <FastForwardIcon
              style={{
                fontSize: '2em',
                fontFamily: 'gameria',
                paddingLeft: '3px'
              }}
            />
          </Button>
          <VerImagen imgUrl={imgUrl} contraste={contraste} />
        </div>
        <Divider
          style={{
            marginInline: '10%',
            backgroundColor: 'black',
            height: '2px',
            marginTop: '1%',
            marginBottom: '3%'
          }}
          variant="middle"
        />
        <div style={actionsImageCSS}>
          <Button
            onClick={() => history.push('/')}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: 'red',
              fontSize: '2.2em',
              fontFamily: 'gameria'
            }}
          >
            {t('board.EXIT')}
          </Button>
          <Button
            onClick={handleZoomOutClick}
            disabled={zoom < 1}
            variant="contained"
            style={{
              padding: '0 5px',
              fontSize: '2.2em',
              fontFamily: 'gameria',
              backgroundColor: contraste === 'bajo' ? '#1768AC' : 'black'
            }}
            color="primary"
          >
            {t('board.REDUCE')}
            <ZoomOutIcon
              style={{
                fontSize: '2em',
                fontFamily: 'gameria',
                paddingLeft: '3px'
              }}
            />
          </Button>
          <Button
            onClick={handleZoomInClick}
            disabled={zoom > 7}
            variant="contained"
            style={{
              padding: '0 5px',
              fontSize: '2.2em',
              fontFamily: 'gameria',
              backgroundColor: contraste === 'bajo' ? '#1768AC' : 'black'
            }}
            color="primary"
          >
            {t('board.ENLARGE')}
            <ZoomInIcon
              style={{
                fontSize: '2em',
                fontFamily: 'gameria',
                paddingLeft: '3px'
              }}
            />
          </Button>
          <HelpModal fontSize={'2.2em'} />
        </div>
      </div>
    </>
  );
}

export default Board;
