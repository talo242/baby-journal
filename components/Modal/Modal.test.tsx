import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
  it('should render its children correctly', () => {
    const { getByText } = render(
      <Modal onClose={() => {}}>Modal contents</Modal>
    );
    getByText('Modal contents');
  });

  it('should render a formatted title', () => {
    const { getByText } = render(
      <Modal onClose={() => {}} title="Modal Title">Modal contents</Modal>
    );
    getByText('Modal Title')
  });

  it('should close when clicking the close button', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <Modal onClose={onClose}>My modal</Modal>
    );
    const closeButton = getByLabelText('close modal');
    fireEvent.click(closeButton);
    expect(onClose).toBeCalledTimes(1);
  });

  it('should close when the user clicks the overlay', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal onClose={onClose}>Modal contents</Modal>
    );
    const overlay = getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toBeCalledTimes(1);
  });
});
