import React from 'react';
import { Motion, spring } from 'react-motion';
type TileProps = {
  key: number;
  index: number;
  imgUrl: string;
  tile: number;
  width: number;
  height: number;
  handleTileClick: (index: number) => void;
  boardSize: number;
  gridSize: number;
  showNumbers: boolean;
  isSolved: boolean;
};

function Tile(props: TileProps) {
  const {
    tile,
    index,
    width,
    height,
    handleTileClick,
    imgUrl,
    boardSize,
    gridSize,
    showNumbers,
    isSolved
  } = props;
  const { row, col } = {
    row: Math.floor(index / gridSize),
    col: index % gridSize
  };
  const visualPos = {
    x: col * width,
    y: row * height
  };

  const tileStyle = {
    width: `calc(100% / ${gridSize})`,
    height: `calc(100% / ${gridSize})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${boardSize}px`,
    backgroundPosition: `${(boardSize / gridSize) * -1 * (tile % gridSize)}px ${
      (boardSize / gridSize) * -1 * Math.floor(tile / gridSize)
    }px`
  };
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  };
  const numberStyle = {
    color: 'white',
    background: 'gray',
    padding: '5px 10px',
    borderRadius: '15px',
    textAlign: 'center' as const
  };
  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Si es el último y no está resuelto, se oculta
            opacity: !isSolved && tile === gridSize * gridSize - 1 ? 0 : 1
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {(!imgUrl || showNumbers) && (
            <div style={numberStyle}>{`${tile + 1}`}</div>
          )}
        </li>
      )}
    </Motion>
  );
}

export default Tile;
