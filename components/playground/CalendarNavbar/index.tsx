import React from 'react';

const CalendarNavbar = ({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) => {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];
  const styleLeft = {
    float: 'left',
  };
  const styleRight = {
    float: 'right',
  };
  return (
    <div className={className}>
      <button type="button" style={styleLeft} onClick={() => onPreviousClick()}>
        ← {prev.slice(0, 3)}
      </button>
      <button type="button" style={styleRight} onClick={() => onNextClick()}>
        {next.slice(0, 3)} →
      </button>
    </div>
  );
};

export default CalendarNavbar;
