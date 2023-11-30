import { act, render, screen, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import Form from './Form';
import { FormProvider, useForm } from 'react-hook-form';

const mockAuthenticatedSession = {
  user: {
    email: 'testing@gmail.com',
    id: 'superId',
    name: 'Test User',
  },
  expires: '2023-12-29T01:12:05.380Z',
};
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    register: jest.fn(() => ({ onChange: jest.fn(), onBlur: jest.fn() })),
    handleSubmit: jest.fn(),
    control: {},
    formState: {},
  })),
  useFieldArray: jest.fn(() => ({
    fields: [],
    append: jest.fn(),
    remove: jest.fn(),
  })),
}));

jest.mock('next/navigation');

describe('Form component tests', () => {
  it('Should render the Form component', async () => {
    const mockOnSubmit = jest.fn();
    const mockForm = {
      register: jest.fn((ref) => 'Test'),
      handleSubmit: jest.fn((callback) => callback),
      control: {},
      formState: {},
    };
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Form type="Create" onSubmit={mockOnSubmit} form={mockForm} />
        </SessionProvider>
      )
    );
  });

  it('renders Form component with "Create" type', async () => {
    const mockOnSubmit = jest.fn();
    const mockForm = {
      register: jest.fn((ref) => 'Test'),
      handleSubmit: jest.fn((callback) => callback),
      control: {},
      formState: {},
    };
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Form type="Create" onSubmit={mockOnSubmit} form={mockForm} />
        </SessionProvider>
      )
    );

    expect(await screen.getByText('Create Post')).toBeInTheDocument();
  });

  it('renders Form component with "Edit" type', async () => {
    const mockOnSubmit = jest.fn();
    const mockForm = {
      register: jest.fn((ref) => 'Test'),
      handleSubmit: jest.fn((callback) => callback),
      control: {},
      formState: {},
    };
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Form type="Edit" onSubmit={mockOnSubmit} form={mockForm} />
        </SessionProvider>
      )
    );

    expect(await screen.getByText('Edit Post')).toBeInTheDocument();
  });

  it('Do not render file input when "Edit" type', async () => {
    const mockOnSubmit = jest.fn();
    const mockForm = {
      register: jest.fn((ref) => 'Test'),
      handleSubmit: jest.fn((callback) => callback),
      control: {},
      formState: {},
    };
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Form type="Edit" onSubmit={mockOnSubmit} form={mockForm} />
        </SessionProvider>
      )
    );

    expect(await screen.queryByText('Photo (optional)')).toBeNull();
  });
});

const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Invalid attribute name')
  ) {
    return;
  }
  originalError(...args);
};
