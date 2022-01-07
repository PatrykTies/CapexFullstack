import React from 'react';
import DayPicker from 'react-day-picker';

const AvailabilityCalendar = (props) => {
  const { modifiers } = props;
  const mod = {
    ...modifiers,
    unavailable: { from: new Date(2022, 3, 4), to: new Date(2022, 3, 7) },
    available: { from: new Date(2022, 2, 3), to: new Date(2022, 2, 14) },
  };

  return <DayPicker modifiers={mod} {...props} />;
};

export default AvailabilityCalendar;
