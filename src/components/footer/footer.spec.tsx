import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Footer } from './footer';


test('Footer', () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});

