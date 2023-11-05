import Link from 'next/link';
import whenLoggedIn from '../Routes/whenLoggedIn';
import { AuthForm } from '../../types/next-auth';
import { useForm } from 'react-hook-form';

const AuthForm = ({ onSubmit, type }: AuthForm) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-inter">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={'/assets/icons/logo.svg'}
            alt="cooks compass"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {type === 'signup' ? 'Create a new account' : 'Log in account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
              </div>
            </div>

            {type !== 'signin' ? (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your name
                </label>
                <div className="mt-2">
                  <input
                    {...register('name', {
                      required: 'Name is required',
                    })}
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name && (
                    <p className="text-red-500">{`${errors.name.message}`}</p>
                  )}
                </div>
              </div>
            ) : null}

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 10 characters',
                    },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="black_btn w-full"
                disabled={isSubmitting}
              >
                {type === 'signup' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </form>
          {type !== 'signin' ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold leading-6 text-gray-600 hover:text-gray-400 transition-colors "
              >
                Sign in
              </Link>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="font-semibold leading-6 text-gray-600 hover:text-gray-400 transition-colors "
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default whenLoggedIn(AuthForm);
