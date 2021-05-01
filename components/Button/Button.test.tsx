import React from 'react';
import Button from './Button';
import { fireEvent, render } from '@testing-library/react';

describe('Button component', () => {
  it('should correctly render children elements', () => {
    const { getByText } = render(<Button>Hello world</Button>);
    getByText('Hello world');
  });

  it('should render a loader when loading prop is true', () => {
    const { getByTestId, queryByText, getByText } = render(
      <Button loading>Submit</Button>
    );
    getByTestId('spinner');
    getByText('Loading');
    expect(queryByText('Submit')).toBeFalsy();
  });

  it('calls a function on click', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Submit</Button>);
    fireEvent.click(getByText('Submit'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not call a function when disabled', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={onClick}>
        Submit
      </Button>
    );
    fireEvent.click(getByText('Submit'));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
