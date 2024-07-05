import React, { useRef } from 'react';

const getCircleCenterCoords = ({ x, y, width }) => {
  const radius = width / 2;
  return { x: x + radius, y: y + radius };
};

const getRotationForPoint = (vertex, point) => {
  // Probably better way to name and approach these
  // My high school trigonometry knowledge is fuzzy, please help!
  const adjacent = vertex.y - point.y;
  const opposite = point.x - vertex.x;
  const centralAngle = Math.atan(opposite / adjacent);
  const mod = point.y > vertex.y ? Math.PI : 2 * Math.PI;
  const rotation = (centralAngle + mod) > 2 * Math.PI ? centralAngle : centralAngle + mod;
  return rotation / (2 * Math.PI);
};

const getDefaultLabels = playing => ({
  PLAY_BUTTON: playing ? 'Pause' : 'Play'
});

// eslint-disable-next-line react/prop-types
const PlayIcon = ({ playing }) => <span className={`rpcc-play-icon${playing ? ' pause' : ''}`} />;

const ReactPlayerCircleControls = ({
  ariaLabels,
  color = 'White',
  iconColor,
  icon,
  loaded = 0,
  progressSize = 12,
  played = 0,
  playing,
  size = 80,
  onSeek,
  onTogglePlaying
}) => {
  const playerRef = useRef(null);
  const buttonRef = useRef(null);
  const labels = ariaLabels || getDefaultLabels(playing, played);
  const vars = {
    '--rpcc-color': color,
    '--rpcc-play-icon-color': iconColor,
    '--rpcc-progress-loaded': loaded,
    '--rpcc-progress-played': played,
    '--rpcc-progress-size': `${progressSize}px`,
    '--rpcc-size': `${size}px`
  };

  const onSeekClick = e => {
    if (buttonRef.current && buttonRef.current.contains(e.target)) {
      return;
    }

    const point = { x: e.clientX, y: e.clientY };
    const vertex = getCircleCenterCoords(playerRef.current.getBoundingClientRect());
    onSeek(getRotationForPoint(vertex, point));
  };

  return (
    <div
      className="rpcc-player flex w-full h-full justify-center items-center"
      style={vars} onClick={onSeek && onSeekClick}
    >
      <div ref={playerRef} className="rpcc-player-inner">
        <svg className="rpcc-ring-container">
          <circle shapeRendering="geometricPrecision" className="rpcc-ring rpcc-ring__duration" />
          <circle shapeRendering="geometricPrecision" className="rpcc-ring rpcc-ring__loaded" />
          <circle shapeRendering="geometricPrecision" className="rpcc-ring rpcc-ring__played" />
        </svg>
        <button
          ref={buttonRef}
          type="button"
          className="rpcc-play-button"
          aria-label={labels.PLAY_BUTTON}
          onClick={onTogglePlaying}
        >
          {icon || <PlayIcon playing={playing} />}
        </button>
      </div>
    </div>
  );
};

export default ReactPlayerCircleControls;