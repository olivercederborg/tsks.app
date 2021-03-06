import { AiOutlineGoogle } from "react-icons/ai";

import { useAuth } from "@/lib/auth";
import { IoLogoFacebook } from "react-icons/io5";
import { useRef } from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import Head from "next/head";

const SignInPage = () => {
	const auth = useAuth();
	const emailInput = useRef(null);
	const passwordInput = useRef(null);

	const onSigninWithEmail = (e) => {
		e.preventDefault();
		auth.signinWithEmail(email.value, password.value);
	};

	return (
		<>
			<Head>
				<title>Sign in - Tsks.</title>
			</Head>
			<main className='sign-in-up-balls flex items-start justify-center min-h-screen px-6 pb-16'>
				<section className='bg md:mt-40 flex flex-col items-center justify-center w-full max-w-sm mt-24'>
					<h1 className='mb-20 text-5xl font-bold'>Sign in.</h1>
					<button
						onClick={() => auth.signinWithGoogle()}
						className={`default-focus py-4 text-white text-opacity-80 hover:text-opacity-100 flex justify-center items-center border-3 w-full border-secondary-card hover:bg-secondary-card rounded-xl transition-all duration-200 ease-in-out font-medium`}
					>
						<AiOutlineGoogle className={`mr-2 text-2xl`} />
						Continue with Google
					</button>
					<button
						onClick={() => auth.signinWithFacebook()}
						className={`default-focus mt-5 py-4 text-white text-opacity-80 hover:text-opacity-100 flex justify-center items-center border-3 w-full border-secondary-card hover:bg-secondary-card rounded-xl transition-all duration-200 ease-in-out font-medium`}
					>
						<IoLogoFacebook className={`mr-2 text-2xl`} />
						Continue with Facebook
					</button>
					<p className='opacity-60 my-4 font-medium'>or</p>
					<form
						className='flex flex-col w-full'
						onSubmit={onSigninWithEmail}
					>
						<label htmlFor='email' className='hidden mt-4 mb-2 ml-2'>
							Email
						</label>
						<input
							required
							ref={emailInput}
							id='email'
							name='email'
							type='email'
							placeholder='Email'
							className='default-focus text-opacity-80 hover:text-opacity-100 border-3 border-secondary-card hover:border-primary-default rounded-xl bg-primary-background flex items-center justify-center w-full px-5 py-4 font-medium text-white transition-all duration-200 ease-in-out'
						/>

						<label htmlFor='password' className='hidden mt-4 mb-2 ml-2'>
							Password
						</label>
						<input
							required
							ref={passwordInput}
							id='password'
							name='password'
							type='password'
							placeholder='Password'
							className='default-focus text-opacity-80 hover:text-opacity-100 border-3 border-secondary-card hover:border-primary-default rounded-xl bg-primary-background flex items-center justify-center w-full px-5 py-4 mt-5 font-medium text-white transition-all duration-200 ease-in-out'
						/>

						<button
							type='submit'
							className='rounded-xl bg-gradient-to-tr shadow-button from-gradient1-button via-gradient2-button hover:-translate-y-1 to-gradient3-button px-8 py-4 mt-6 font-semibold transition-all duration-200 ease-in-out transform'
						>
							Sign in
						</button>
					</form>
					<p className='text-gray-text mt-8'>
						Don't have an account?{" "}
						<Link href='/users/signup' passHref>
							<a className='text-white'>Sign up</a>
						</Link>
					</p>

					<Link href='/users/resetpassword' passHref>
						<a className='mt-4 text-white'>Forgot password?</a>
					</Link>

					<Link href='/' passHref>
						<a className='text-gray-text flex items-center justify-center mt-8'>
							<HiArrowLeft className='mr-2' />
							Back to Home
						</a>
					</Link>
				</section>
			</main>
		</>
	);
};

export default SignInPage;
