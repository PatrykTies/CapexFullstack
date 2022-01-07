import React from 'react';
import classnames from 'classnames';

const AvailabilityCell = ({ day, modifiers }) => {
  const classes = classnames('cell', {
    ...modifiers,
  });
  return (
    <div className={classes}>
      <h3>{day.getDate()}</h3>
      <style jsx>{`
        .cell {
          position: relative;
        }

        .cell:not(.start, .end, .selected, .unavailable)::after {
          content: '';
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 100%;
          background-color: grey;
          transform: translateX(-50%);
        }

        .cell.available:not(.unavailable)::after {
          background-color: #03fc0f;
        }

        .cell.unavailable::after {
          content: 'X';
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 100%;
          color: red;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
};

export default AvailabilityCell;
