import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { SessionProvider, signOut } from 'next-auth/react';
import Nav from './Nav';

export const useRouter = jest.fn();

const mockAuthenticatedSession = {
  user: {
    email: 'testing@gmail.com',
    id: 'superId',
    name: 'Test User',
  },
  expires: '2023-12-29T01:12:05.380Z',
};

const mockUnAuthenticatedSession = null;

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  signOut: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Nav component tests', () => {
  it('Should Render the Nav component', async () => {
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Nav />
        </SessionProvider>
      )
    );
  });

  it('Should render sign out button when authenticated', async () => {
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Nav />
        </SessionProvider>
      )
    );
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('Create new recipe')).toBeInTheDocument();
  });

  it('Should render sign up button when unauthenticated', async () => {
    await act(async () =>
      render(
        <SessionProvider session={mockUnAuthenticatedSession}>
          <Nav />
        </SessionProvider>
      )
    );

    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('Should sign out', async () => {
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Nav />
        </SessionProvider>
      )
    );

    const signOutButton = screen.getByText('Sign out');

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});
