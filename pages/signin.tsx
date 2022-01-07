import React, { useState } from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
// import AuthForm from '../components/authForm';

// const Signin = () => {
//   return <AuthForm mode="signin" />;
// };
const Navbar = ({
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
        }
        .right {
        }
      `}</style>
    </div>
  );
};

const Calendar = () => {
  const getInitialState = () => {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  };

  const [range, setRange] = useState(getInitialState());

  const isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  const handleResetClick = () => {
    setRange(getInitialState());
  };

  const handleDayClick = (day) => {
    const { from, to } = range;
    if (from && to && day >= from && day <= to) {
      handleResetClick();
      return;
    }
    if (isSelectingFirstDay(from, to, day)) {
      setRange({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      setRange({
        from, // leave unchanged from const { from, to } = range;
        to: day,
        enteredTo: day,
      });
    }
  };

  const handleDayMouseEnter = (day) => {
    const { from, to } = range;
    if (!isSelectingFirstDay(from, to, day)) {
      setRange({
        from, // leave unchanged from const { from, to } = range;
        to,
        enteredTo: day,
      });
    }
  };

  const { from, to, enteredTo } = range;
  const modifiers = { start: from, end: enteredTo };
  const disabledDays = { before: range?.from };
  const selectedDays = [from, { from, to: enteredTo }];
  return (
    <div className="container">
      <DayPicker
        className="Range"
        numberOfMonths={4}
        pagedNavigation
        fromMonth={from}
        selectedDays={selectedDays}
        disabledDays={disabledDays}
        modifiers={modifiers}
        onDayClick={handleDayClick}
        onDayMouseEnter={handleDayMouseEnter}
        navbarElement={<Navbar className="nav" />}
      />
      <div>
        {!from && !to && 'Please select the first day.'}
        {from && !to && 'Please select the last day.'}
        {from &&
          to &&
          `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
        {from && to && (
          <button type="button" className="link" onClick={handleResetClick}>
            Reset
          </button>
        )}
      </div>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns:
            1.2fr repeat(12, minmax(auto, 125px))
            1.2fr;
          grid-column-gap: 1.6875rem;
          grid-template-rows: auto;
        }
        :global(.DayPicker) {
          display: grid;
          grid-column: 6 / span 4;
        }
        :global(.DayPicker-NavBar) {
          border: solid 2px red;
          top: 700px;
          position: relative;
          display: flex;
          justify-content: space-between;
        }

        .Range
          .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
          color: #4a90e2;
        }
        .Range .DayPicker-Day {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  );
};

const Signin = () => {
  return <Calendar />;
};

Signin.authPage = true;

export default Signin;
