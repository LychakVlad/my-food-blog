import { act, render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import Recipe from './Recipe';

const mockAuthenticatedSession = {
  user: {
    email: 'testing@gmail.com',
    id: 'superId',
    name: 'Test User',
  },
  expires: '2023-12-29T01:12:05.380Z',
};

const recipeObject = {
  comments: [],
  creator: {
    email: 'lycakvladislav@gmail.com',
    name: 'Vladislav Lychak',
    image: 'image',
    _id: 'id',
  },
  _id: '65535585270fed62e7ca91d4',
  description: 'Pizza',
  ingredients: [
    'e.g. 2 cups flour, sifted',
    'e.g. 1 cup sugar',
    'e.g. 2 tablespoons butter, softened',
  ],
  nutrition: {
    cal: '100',
    carbs: '20',
    fats: '7',
    protein: '5',
  },
  photo: {
    base64:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGMQZWP4//1BNCsjw5b+wtdbe0JkGBj2NEXWajHMjjVk6Ih3TDSWKnRTBQApkA283dKIYwAAAABJRU5ErkJggg==',
    imageLink: '/images/7e1de10c0a42a95be42ab52f2adb954b',
  },
  servings: {
    servings: '8',
    yield: 'e.g. 1 9-inch cake',
  },
  steps: [
    'e.g. Preheat oven to 350 degrees F…',
    'e.g. Combine all dry ingredients in a large bowl…',
    'e.g. Pour into greased trays and bake for 15-20 minutes…',
  ],
  tag: 'pizza',
  time: '2023-11-27T15:07:09.056Z',
  timeToDo: {
    cookTime: '5',
    prepTime: '5',
  },
  title: 'Pizza',
  __v: 0,
};

jest.mock('next/navigation');

describe('Profile component tests', () => {
  it('Should Render the Profile component', async () => {
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Recipe post={recipeObject} />
        </SessionProvider>
      )
    );
  });

  it('Should display comment section when logged in', async () => {
    await act(async () =>
      render(
        <SessionProvider session={mockAuthenticatedSession}>
          <Recipe post={recipeObject} />
        </SessionProvider>
      )
    );
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  it('Should hide comment section when not logged in', async () => {
    await act(async () =>
      render(
        <SessionProvider session={null}>
          <Recipe post={recipeObject} />
        </SessionProvider>
      )
    );
    const loginLink = screen.getByRole('link', { name: 'log in' });
    const signUpLink = screen.getByRole('link', { name: 'sign up' });

    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
});
