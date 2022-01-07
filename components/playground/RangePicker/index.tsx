import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';

const RangeDayPicker = ({ extendsCalendar, ...props }) => {
  const [range, setRange] = useState({ from: null, to: null, enteredTo: null });

  const isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  const handleClickDay = (day) => {
    const { from, to } = range;
    if (isSelectingFirstDay(from, to, day)) {
      return setRange({
        from: day,
        to: null,
        enteredTo: null,
      });
    }

    setRange({ ...range, to: day, enteredTo: day });
  };

  const handleMouseEnterDay = (day) => {
    const { from, to } = range;
    if (isSelectingFirstDay(from, to, day)) return;
    setRange({ ...range, enteredTo: day });
  };

  const modifiers = { start: range.from, end: range.enteredTo };
  const selectedDays = [range.from, { from: range.from, to: range.enteredTo }];

  if (extendsCalendar) {
    const Calendar = extendsCalendar;
    return (
      <Calendar
        className="Range"
        modifiers={modifiers}
        selectedDays={selectedDays}
        onDayClick={handleClickDay}
        onDayMouseEnter={handleMouseEnterDay}
        {...props}
      />
    );
  }

  const mod = {
    ...modifiers,
    unavailable: { from: new Date(2022, 3, 4), to: new Date(2022, 3, 7) },
    available: { from: new Date(2022, 2, 3), to: new Date(2022, 2, 14) },
  };

  return (
    <DayPicker
      className="Range"
      modifiers={mod}
      selectedDays={selectedDays}
      onDayClick={handleClickDay}
      onDayMouseEnter={handleMouseEnterDay}
      {...props}
    />
  );
};

export default RangeDayPicker;
