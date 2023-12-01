jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname: jest.fn(() => ({ pathname: '' })),
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({
      get: jest.fn(),
    })),
  };
});
