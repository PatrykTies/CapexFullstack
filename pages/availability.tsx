import React from 'react';
import 'react-day-picker/lib/style.css';
// Components
import RangeDayPicker from '../components/playground/RangePicker';
import AvailabilityCalendar from '../components/playground/AvailabilityCalendar';
import AvailabilityCell from '../components/playground/AvailabilityCell';
import CalendarNavbar from '../components/playground/CalendarNavbar';

// Styles
import {
  // RangePickerStyleset1,
  RangePickerStyleset2,
} from '../components/playground/stylesets/RangePicker';

const AvailabilityPage = () => {
  return (
    <div className="container">
      <div className="picker-wrapper">
        <RangeDayPicker
          numberOfMonths={4}
          pagedNavigation
          navbarElement={<CalendarNavbar />}
          extendsCalendar=""
          modifiersStyles={{ today: { color: 'green' } }}
          renderDay={(day, modifiers) => <AvailabilityCell day={day} modifiers={modifiers} />}
        />
      </div>

      <RangePickerStyleset2 />
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .picker-wrapper {
          max-width: 750px;
        }
      `}</style>
    </div>
  );
};

AvailabilityPage.authPage = true;

export default AvailabilityPage;

// <RangePickerStyleset1 />
