import React, { useEffect, useRef, useState } from 'react';
import OptionsButton from '../Button/OptionsButton';
import styled from 'styled-components';
import PencilIcon from '../Icons/PencilIcon';
import TrashIcon from '../Icons/TrashIcon';

const DropdownContainer = styled.div`
  position: relative;
`;

const Dropdown = styled.div`
  padding: 0;
  background-color: white;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 96, 0.25);
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  margin: 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 12px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: Nunito, sans-serif;

  &:hover,
  &:focus {
    outline: none;
    background-color: #eaeaea;
  }

  svg {
    margin-right: 8px;
    width: 12px;
    height: 12px;
  }
`;

interface OptionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const OptionsDropdown = (props: OptionsDropdownProps) => {
  const { onEdit, onDelete } = props;
  const [active, setActive] = useState<boolean>(false);
  const containerRef = useRef(null);
  let timeOutId;

  /** Support for Mozilla and Safari */
  const onClickOutsideHandler = (event) => {
    if (active && !containerRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);

    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  });

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  // From: https://reactjs.org/docs/accessibility.html
  const onBlurHandler = () => {
    timeOutId = setTimeout(() => setActive(false));
  };

  // If a child receives focus, do not close the popover.
  const onFocusHandler = () => {
    clearTimeout(timeOutId);
  };

  const toggleActiveDropdown = () => setActive(!active);

  const handleElementClick = (fn) => () => {
    setActive(false);
    fn();
  };

  return (
    <DropdownContainer
      ref={containerRef}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
    >
      <OptionsButton onClick={toggleActiveDropdown} />
      {active && (
        <Dropdown>
          <DropdownButton onClick={handleElementClick(onEdit)}>
            <PencilIcon /> Edit
          </DropdownButton>
          <DropdownButton onClick={handleElementClick(onDelete)}>
            <TrashIcon /> Delete
          </DropdownButton>
        </Dropdown>
      )}
    </DropdownContainer>
  );
};

export default OptionsDropdown;
