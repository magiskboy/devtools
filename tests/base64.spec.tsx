import React from 'react';
import { test, expect } from 'vitest';
import { getByTestId, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routeTree } from '../src/routeTree.gen';
import { createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router';
import 'bulma/css/bulma.min.css';

test('base64', async () => {
  const router = createRouter({ routeTree });
  const history = createMemoryHistory({ initialEntries: ['/base64'] });
  const { container, getByText, getByPlaceholderText } = render(
    <RouterProvider router={router} history={history} />
  );

  // Wait for the route to be ready and component mounted
  await waitFor(() => {
    expect(container.querySelector('.cm-content')).toBeTruthy();
  });

  // Test initial render
  expect(container).toMatchSnapshot();
  
  // Test encode/decode buttons exist
  const encodeBtn = getByTestId(container, 'encode-button');
  const decodeBtn = getByTestId(container, 'decode-button');
  expect(encodeBtn).toBeDefined();
  expect(decodeBtn).toBeDefined();

  // Test input fields exist
  const dataInput = getByPlaceholderText('Enter text to encode/decode');
  expect(dataInput).toBeDefined();

  // Test auto-convert checkbox exists
  const autoConvertCheckbox = container.querySelector('input[type="checkbox"]');
  expect(autoConvertCheckbox).toBeDefined();
  if (!autoConvertCheckbox) throw new Error('Checkbox not found');

  // Test encoding
  const testText = 'Hello World';
  const encodedText = 'SGVsbG8gV29ybGQ=';
  
  await userEvent.type(dataInput, testText);
  await userEvent.click(encodeBtn);
  
  const encodedOutput = container.querySelectorAll('.cm-content')[1];
  expect(encodedOutput.textContent).toBe(encodedText);

  // Test decoding
  await userEvent.clear(dataInput);
  await userEvent.type(encodedOutput, encodedText);
  await userEvent.click(decodeBtn);
  
  const decodedOutput = container.querySelectorAll('.cm-content')[0];
  expect(decodedOutput.textContent).toBe(testText);

  // Test auto-convert
  await userEvent.click(autoConvertCheckbox);
  await userEvent.type(dataInput, 'Test');
  expect(encodedOutput.textContent).toBe('VGVzdA==');

  // Test error handling
  await userEvent.clear(encodedOutput);
  await userEvent.type(encodedOutput, 'invalid base64!');
  await userEvent.click(decodeBtn);
  expect(getByText('Invalid Base64 format')).toBeDefined();
})
