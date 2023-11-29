import { act, render, waitFor, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import Profile from './Profile';

const mockAuthenticatedSession = {
  user: {
    email: 'testing@gmail.com',
    id: 'superId',
    name: 'Test User',
  },
  expires: '2023-12-29T01:12:05.380Z',
};

jest.mock('next/navigation');

describe('Profile component tests', () => {
  it('Should Render the Profile component', async () => {
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Profile />
        </SessionProvider>
      )
    );
  });
});
