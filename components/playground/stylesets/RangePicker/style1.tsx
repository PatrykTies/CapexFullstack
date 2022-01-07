import React from 'react';

// Config

export const COLOUR_BLUEBERRY = '#4b41e6';
export const COLOUR_BLUEBERRY_DARK = '#3C33C8';

const RangePickerStyleset1 = () => (
  <style jsx="true">{`
    .Range {
      padding: 1rem;
      background-color: white;
      filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.06));
    }

    .Range .DayPicker-Day--selected {
      border-radius: 0 !important;
      background-color: ${COLOUR_BLUEBERRY}!important;
    }

    .Range .DayPicker-Day--start {
      border-radius: 100% !important;
      background-color: ${COLOUR_BLUEBERRY_DARK}!important;
    }

    .Range .DayPicker-Day--end {
      border-radius: 100% !important;
      background-color: ${COLOUR_BLUEBERRY_DARK}!important;
    }

    .Range .DayPicker-Day--start + .Range .DayPicker-Day--selected::before,
    .Range .DayPicker-Day--end::after {
      content: '';
      display: block;
      height: 100%;
      width: 50%;
      background-color: #4b40e5;
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: -1;
    }

    .Range .DayPicker-Day--start::before {
      left: 50%;
      right: 0;
    }

    .Range .DayPicker-Day--end::after {
      left: 0;
      right: 50%;
    }
  `}</style>
);

export default RangePickerStyleset1;
