import React from 'react';
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { routeTree } from '../src/routeTree.gen';
import { createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router';
import 'bulma/css/bulma.min.css';


test('sql-fmt', () => {
  const router = createRouter({ routeTree });
  const history = createMemoryHistory({ initialEntries: ['/sql-fmt'] });
  const { container } = render(<RouterProvider router={router} history={history} />);
  expect(container).toMatchSnapshot();
})
