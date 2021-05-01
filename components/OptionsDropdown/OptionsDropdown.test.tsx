import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import OptionsDropdown from './OptionsDropdown';

describe('OptionsDropdown component', () => {
  it('should open and close the dropdown when clicking the open button', () => {
    const { getByText, getByLabelText, queryByText } = render(
      <OptionsDropdown onEdit={() => {}} onDelete={() => {}} />
    );
    const toggleButton = getByLabelText('toggle dropdown');
    fireEvent.click(toggleButton);
    getByText('Edit');
    getByText('Delete');
    fireEvent.click(toggleButton);
    expect(queryByText('Edit')).toBeFalsy();
    expect(queryByText('Delete')).toBeFalsy();
  });

  it('should call a function when clicking the edit option', () => {
    const onEdit = jest.fn();
    const { getByText, getByLabelText } = render(
      <OptionsDropdown onEdit={onEdit} onDelete={() => {}} />
    );
    const toggleButton = getByLabelText('toggle dropdown');
    fireEvent.click(toggleButton);
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('should call a function when clicking the delete option', () => {
    const onDelete = jest.fn();
    const { getByText, getByLabelText } = render(
      <OptionsDropdown onEdit={() => {}} onDelete={onDelete} />
    );
    const toggleButton = getByLabelText('toggle dropdown');
    fireEvent.click(toggleButton);
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should close when clicking outside the dropdown', () => {
    const { getByText, getByLabelText, queryByText } = render(
      <div>
        <OptionsDropdown onEdit={() => {}} onDelete={() => {}} />
        <button>Other button</button>
      </div>
    );
    const toggleButton = getByLabelText('toggle dropdown');
    const otherButton = getByText('Other button');
    fireEvent.click(toggleButton);
    getByText('Edit');
    getByText('Delete');
    fireEvent.click(otherButton);
    expect(queryByText('Edit')).toBeFalsy();
    expect(queryByText('Delete')).toBeFalsy();
  });
});
