jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname: () => ({ pathname: '' }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({ get: () => {} }),
    useServerInsertedHTML: jest.fn(),
  };
});
