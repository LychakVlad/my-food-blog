import Link from 'next/link';
import whenLoggedIn from '../Routes/whenLoggedIn';
import { AuthForm } from '../../types/next-auth';
import { useForm } from 'react-hook-form';
import CustomInput from '../UI/Input/Input';
import logoImage from '/assets/icons/logo.svg';
import Image from 'next/image';

const AuthForm = ({ onSubmit, type, error }: AuthForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-inter">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src={logoImage}
            alt="cooks compass"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {type === 'signup' ? 'Create a new account' : 'Log in account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label="Email address"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              register={register}
              errors={errors.email}
              required={true}
              cytest="auth-email"
            />

            {type !== 'signin' && (
              <CustomInput
                label="Name"
                placeholder="Your username"
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                register={register}
                errors={errors.name}
                required={true}
                cytest="auth-name"
              />
            )}

            <CustomInput
              label="Password"
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              register={register}
              errors={errors.password}
              required={true}
              cytest="auth-password"
            />

            <div>
              <button
                type="submit"
                className="black_btn w-full"
                disabled={isSubmitting}
              >
                {type === 'signup' ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </form>
          {type !== 'signin' ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold leading-6 text-gray-600 hover:text-gray-400 transition-colors "
                data-cy="link-to-login-page"
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
                data-cy="link-to-signup-page"
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
