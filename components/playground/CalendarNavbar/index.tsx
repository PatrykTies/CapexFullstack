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

  return (
    <div className={className}>
      <button type="button" className="left" onClick={() => onPreviousClick()}>
        ← {prev.slice(0, 3)}
      </button>
      <button type="button" className="right" onClick={() => onNextClick()}>
        {next.slice(0, 3)} →
      </button>
      <style jsx>{`
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      `}</style>
    </div>
  );
};

export default CalendarNavbar;
