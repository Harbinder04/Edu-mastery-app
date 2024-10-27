"use client";
import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaGoogle } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Automatically sign in
        const signInResponse = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false, // Prevent automatic redirect
        });

        if (signInResponse?.ok) {
          router.push('/dashboard');
        } else {
          setError('Sign-in failed. Please check your credentials.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-centers'>
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
            Welcome to{' '}
            <span className="bg-red-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
              EduMastry
            </span>
          </h2>
          <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl">
            Sign Up to access paid content!
          </p>
        </div>
          {/* Form fields for name, email, password */}
          <label htmlFor='name'>Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='p-2 my-3 border border-gray-900 overflow-hidden w-full rounded-lg'
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className='p-2 my-3 border border-gray-900 overflow-hidden w-full rounded-lg'
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className='p-2 my-3 border border-gray-900 overflow-hidden w-full rounded-lg'
          />

          <button type="submit" className='bg-gray-900 text-white rounded-xl hover:bg-gray-700 w-fit p-3 mx-auto'>Sign Up</button>
          <button type="button" onClick={() => signIn('google')} className='flex items-center justify-center bg-red-500 text-white rounded-xl hover:bg-red-400 w-fit p-3 mx-auto mt-4'>
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </form>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/signin" className="text-blue-500 hover:text-blue-400">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}