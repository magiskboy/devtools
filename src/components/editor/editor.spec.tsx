import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Editor } from './editor';


test('Editor', () => {
  const { container } = render(<Editor />);
  expect(container).toMatchSnapshot();
});

