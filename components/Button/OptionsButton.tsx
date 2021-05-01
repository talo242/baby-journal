import React from 'react';
import { SquareButton } from './Button';

interface OptionsButton {
  onClick: () => void;
}

const OptionsButton = (props: OptionsButton) => {
  const { onClick } = props;
  return (
    <SquareButton aria-label="toggle dropdown" onClick={onClick}>
      <svg
        width="16"
        height="4"
        viewBox="0 0 16 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.60002 2.375C9.60002 1.47617 8.88502 0.75 8.00002 0.75C7.11502 0.75 6.40002 1.47617 6.40002 2.375C6.40002 3.27383 7.11502 4 8.00002 4C8.88502 4 9.60002 3.27383 9.60002 2.375ZM14 4C13.115 4 12.4 3.27383 12.4 2.375C12.4 1.47617 13.115 0.75 14 0.75C14.885 0.75 15.6 1.47617 15.6 2.375C15.6 3.27383 14.885 4 14 4ZM2.00002 4C1.11502 4 0.400024 3.27383 0.400024 2.375C0.400024 1.47617 1.11502 0.75 2.00002 0.75C2.88502 0.75 3.60002 1.47617 3.60002 2.375C3.60002 3.27383 2.88502 4 2.00002 4Z"
          fill="black"
        />
      </svg>
    </SquareButton>
  );
};

export default OptionsButton;
