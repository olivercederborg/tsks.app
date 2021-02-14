import { AiOutlineGoogle } from "react-icons/ai";
import firebase from "firebase/app";

import { useAuth } from "@/lib/auth";
import { IoLogoFacebook } from "react-icons/io5";
import { useRef, useState } from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import Head from "next/head";

const ResetPasswordPage = () => {
	const [resetPwResult, setResetPwResult] = useState(null);
	const [resetPwError, setResetPwError] = useState(null);

	const resetPasswordEmail = (e) => {
		e.preventDefault();

		return firebase
			.auth()
			.sendPasswordResetEmail(email.value)
			.then(() => {
				setResetPwError(null);
				setResetPwResult("Email sent!");
			})
			.catch((error) => {
				if (error.code == "auth/user-not-found") {
					setResetPwError("User was not found.");
				} else {
					setResetPwError("Something went wrong.");
					setResetPwResult(null);
				}
			});
	};

	return (
		<>
			<Head>
				<title>Reset password - Tsks.</title>
			</Head>
			<main className='sign-in-up-balls flex items-start justify-center min-h-screen px-6 pb-16'>
				<section className='bg md:mt-40 flex flex-col items-center justify-center w-full max-w-sm mt-24'>
					<h1 className='mb-6 text-5xl font-bold leading-snug text-center'>
						Forgotten Password?
					</h1>
					<p className='text-gray-text mb-14 text-center'>
						Don't worry, simply enter your email in the field below, then
						we'll send you a link to reset your password shortly.
					</p>
					<form
						className='flex flex-col w-full'
						onSubmit={resetPasswordEmail}
					>
						{resetPwResult && (
							<p className='mb-4 text-green-400'>{resetPwResult}</p>
						)}
						{resetPwError && (
							<p className='mb-4 text-red-400'>{resetPwError}</p>
						)}
						<label htmlFor='email' className='hidden mt-4 mb-2 ml-2'>
							Email
						</label>
						<input
							required
							id='email'
							name='email'
							type='email'
							placeholder='Email'
							className='default-focus text-opacity-80 hover:text-opacity-100 border-3 border-secondary-card hover:border-primary-default rounded-xl bg-primary-background flex items-center justify-center w-full px-5 py-4 font-medium text-white transition-all duration-200 ease-in-out'
						/>

						<button
							type='submit'
							className='rounded-xl bg-gradient-to-tr shadow-button from-gradient1-button via-gradient2-button hover:-translate-y-1 to-gradient3-button px-8 py-4 mt-4 font-semibold transition-all duration-200 ease-in-out transform'
						>
							Send
						</button>
					</form>

					<Link href='/users/signin' passHref>
						<a className='text-gray-text flex items-center justify-center mt-8'>
							<HiArrowLeft className='mr-2' />
							Back to Sign in
						</a>
					</Link>
				</section>
			</main>
		</>
	);
};

export default ResetPasswordPage;
