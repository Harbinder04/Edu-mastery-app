"use client";
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaGoogle } from "react-icons/fa";

function Signin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    passReq: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const router = useRouter();
  const email = useRef('');
  const password = useRef('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    email.current = value;
    setRequiredError((prevState) => ({
      ...prevState,
      emailReq: false,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    password.current = value;
    setRequiredError((prevState) => ({
      ...prevState,
      passReq: false,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    const loadId = toast.loading('Signing in...');
    if (e) {
      e.preventDefault();
    }

    if (!email.current || !password.current) {
      setRequiredError({
        emailReq: !email.current,
        passReq: !password.current,
      });
      toast.dismiss(loadId);
      return;
    }

    setCheckingPassword(true);
    const res = await signIn('credentials', {
      username: email.current,
      password: password.current,
      redirect: false,
    });

    toast.dismiss(loadId);
    if (!res?.error) {
      router.push('/');
      toast.success('Signed In');
    } else {
      toast.error('Oops, something went wrong!');
      setCheckingPassword(false);
    }
  };

  return (
    <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          type: 'spring',
          damping: 10,
        }}
        className="flex w-full flex-col justify-between gap-12 rounded-2xl bg-white p-8 md:max-w-[30vw]"
      >
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
            Welcome to{' '}
            <span className="bg-red-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
              EduMastry
            </span>
          </h2>
          <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl">
            Log in to access paid content!
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid w-full items-center gap-4">
            <div className="relative flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className='p-2 my-3 border border-gray-900 overflow-hidden w-full rounded-lg focus:ring-orange-700 focus:outline-none'
                name="email"
                id="email"
                placeholder="name@email.com"
                onChange={handleEmailChange}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    passwordRef.current?.focus();
                  }
                }}
              />
              {requiredError.emailReq && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <label>Password</label>
              <div className="flex justify-center items-center">
                <input
                 className='p-2 my-3 border border-gray-900 overflow-hidden w-full rounded-lg focus:ring-orange-700 focus:outline-none'
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  ref={passwordRef}
                  onChange={handlePasswordChange}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      setIsPasswordVisible(false);
                      handleSubmit();
                    }
                  }}
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-0 flex h-10 items-center px-4 text-neutral-500"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {requiredError.passReq && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
          </div>
          <button
            className="bg-gray-900 hover:bg-gray-700 text-white rounded-lg p-3"
            disabled={!email.current || !password.current || checkingPassword}
            onClick={handleSubmit}
          >
            Login
          </button>
          <button
        type="button"
        onClick={() => signIn('google')}
        className="flex items-center justify-center bg-red-500 text-white rounded-xl hover:bg-red-400 w-fit p-3 mx-auto mt-4"
      >
        <FaGoogle className="mr-2" />
        Continue with Google
      </button>
        </div>
      </motion.div>
    </section>
  );
}

export default Signin;