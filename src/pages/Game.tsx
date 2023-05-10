import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { useEffect, useState } from 'react';
import Board from '../components/Board';
import Congrats from '../components/Congrats';
import images from '../components/images';
import Inicio from '../components/Inicio';

function Game() {
  const [gridSize, setGridSize] = useState(4);
  const [zoom, setZoom] = useState(4);
  const [boardSize, setBoardSize] = useState(480);
  const [showNumbers, setShowNumbers] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dificultad, setDificultad] = useState('medio');
  const [contraste, setContraste] = useState('bajo');
  const [imageIndex, setImageIndex] = useState(0);
  const [imgUrl, setImgUrl] = useState(images[imageIndex].image);

  const GameMainCSS: CSSProperties = {
    padding: '20px'
  };

  useEffect(() => {
    switch (dificultad) {
      case 'facil':
        setGridSize(2);
        break;
      case 'medio':
        setGridSize(3);
        break;
      case 'dificil':
        setGridSize(4);
        break;

      default:
        setGridSize(3);
        break;
    }
  }, [dificultad]);
  const handleZoomInClick = () => {
    if (zoom < 8) {
      setZoom(zoom + 1);
    }
  };

  const handleZoomOutClick = () => {
    if (zoom > 0) {
      setZoom(zoom - 1);
    }
  };

  useEffect(() => {
    setBoardSize(480 + zoom * 30);
  }, [zoom]);

  const onStartHandler = () => {
    setIsStarted(true);
  };

  const showNumbersHandler = () => {
    setShowNumbers(!showNumbers);
  };

  const dificultadHandler = (item: string) => {
    setDificultad(item);
  };

  const contrasteHandler = (item: string) => {
    setContraste(item);
  };
  const nextImageHanlder = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
      setImgUrl(images[0].image);
    } else {
      setImageIndex(imageIndex + 1);
      setImgUrl(images[imageIndex + 1].image);
    }
  };

  const nextPuzzle = () => {
    setIsFinished(false);
    nextImageHanlder();
    setIsStarted(true);
  };

  return (
    <>
      <div style={GameMainCSS}>
        {!isFinished ? (
          !isStarted ? (
            <Inicio
              onSwitchChange={showNumbersHandler}
              showNumbers={showNumbers}
              dificultad={dificultad}
              changeDificultad={dificultadHandler}
              contraste={contraste}
              changeContraste={contrasteHandler}
              onStart={onStartHandler}
              boardSize={boardSize}
              zoom={zoom}
              handleZoomInClick={handleZoomInClick}
              handleZoomOutClick={handleZoomOutClick}
            />
          ) : (
            <Board
              isStarted={isStarted}
              onStart={onStartHandler}
              imgUrl={imgUrl}
              nextImageHanlder={nextImageHanlder}
              boardSize={boardSize}
              zoom={zoom}
              contraste={contraste}
              gridSize={gridSize}
              showNumbers={showNumbers}
              setIsFinished={setIsFinished}
              imageIndex={imageIndex}
              handleZoomInClick={handleZoomInClick}
              handleZoomOutClick={handleZoomOutClick}
            />
          )
        ) : (
          <Congrats
            nextPuzzle={nextPuzzle}
            contraste={contraste}
            imageIndex={imageIndex}
          />
        )}
      </div>
    </>
  );
}

export default Game;
