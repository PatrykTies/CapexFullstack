/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import React from 'react';

// Config
export const COLOUR_GREEN = '#0ab473';
export const COLOUR_SEAGRASS = '#0a5c78';

const RangePickerStyleset2 = () => (
  <style jsx="true">{`
    .Range {
      padding: 1rem;
      background-color: white;
      filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.06));
    }

    .Range .DayPicker-Day--selected {
      border-radius: 0 !important;
      background-color: ${COLOUR_GREEN}!important;
    }

    .Range .DayPicker-Day--start {
      border-radius: 0 !important;
      background-color: ${COLOUR_SEAGRASS}!important;
    }

    .Range .DayPicker-Day--end {
      border-radius: 0 !important;
      background-color: ${COLOUR_SEAGRASS}!important;
    }
  `}</style>
);

export default RangePickerStyleset2;
