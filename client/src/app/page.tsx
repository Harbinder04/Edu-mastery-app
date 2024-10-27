"use client";
// import Image from "next/image";
import Nav from "@/components/nav";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import StatItem from "@/components/statItem";
import { Star, Users } from 'lucide-react';
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.33]);
  return (
    <div>
      <SessionProvider>
      <Nav />
      </SessionProvider>
      <main
        className={`flex min-h-screen flex-col items-center justify-between text-white`}
      >
        {/* first div */}

        {/* Todo add this in div and make different component for mobile and desktop using hidden propery */}
        <video src="hero_c.mp4" loop autoPlay muted />
        <div className="absolute z-10 text-white top-56">
          <h1 className="text-6xl font-bold text-center">
            Welcome to the EduMastery
          </h1>
          <p className="text-orange-400 text-center text-2xl my-6">
            EduMastery: <span>Your Path to Knowledge</span>
          </p>
          {/* <div className="h-fit w-fit">
        <img src="hero_bg_1.png" alt="Learning image of a lady"/>
      </div> */}
        </div>
        {/* second div */}
        <motion.div
          ref={ref}
          style={{
            scale: scale,
            opacity: scrollYProgress,
          }}
        >
          <div className="h-[50vh] max-w-screen min-h-[30vh]">
            <div className="flex flex-col items-center mt-24 text-white">
              <h2 className="text-3xl font-bold text-center">
                Gain Practical Tech Skills from Experts You Can Trust
              </h2>
              <p className="text-lg text-center mt-4">
                JavaScript, React, and TypeScript to Node.js and Backend (Go,
                Git, Docker, & More)
              </p>
            </div>
            {/* image flex*/}
            <div className="flex flex-row flex-col-span-4 mt-16 text-white justify-center items-center">
              <img
                src="./icons8-javascript-480.png"
                alt="javascript image"
                width={90}
                height={90}
              />
              <img
                src="./icons8-typescript-480.png"
                alt="javascript image"
                width={90}
                height={90}
              />
              <img
                src="./icons8-nodejs-480.png"
                alt="javascript image"
                width={90}
                height={90}
              />
              <img
                src="./icons8-postgresql-480.png"
                alt="javascript image"
                width={90}
                height={90}
              />
              <img
                src="./icons8-ruby-programming-language-480.png"
                alt="javascript image"
                width={90}
                height={90}
              />
              <img
                src="./icons8-rust-programming-language-480.png"
                alt="javascript image"
                width={90}
                height={90}
              />
              <img
                src="./icons8-javascript-480.png"
                alt="javascript image"
                width={90}
                height={90}
              />
            </div>
          </div>
        </motion.div>

        {/* third section */}
        <section className="flex flex-col mt-10">
          <div className="flex flex-row justify-center items-center col-span-2">
            <div className="flex-1 text-black p-4 mx-4 my-10 bg-slate-100 border border-white rounded-xl shadow-white shadow-[0_15px_60px_-15px]">
              <h2 className="text-5xl font-bold mb-7 text-center">
                Learn From the Best Teachers
              </h2>
              <p className="tracking-wide text-center">
                At Frontend Masters, we pride ourselves on offering courses
                designed and taught by leading experts actively employing their
                skills at renowned companies such as Netflix, Spotify, Google,
                and Stripe. Our curriculum is continually refreshed to align
                with the most recent advancements, guaranteeing that our
                learners are equipped with industry-standard best practices and
                cutting-edge techniques.
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center w-fit h-fit mx-4">
              <img
                src="./image.png"
                alt="Image of a lady while learning"
                width={420}
                height={420}
              />
            </div>
          </div>
          <div className="bg-gray-800 py-10">
            <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <StatItem 
            icon={<span className="text-gradient text-4xl font-bold">200+</span>}
            number=""
            text="In-Depth Courses"
          />
          <StatItem 
            icon={<span className="text-gradient text-4xl font-bold">21</span>}
            number=""
            text="Learning Paths"
          />
          
          <StatItem 
            icon={<Star color="red" className="icon-gradient w-12 h-12" />}
            number=""
            text="Industry Leading Experts"
          />
          <StatItem 
            icon={<Users color="red" className="icon-gradient w-12 h-12" />}
            number=""
            text="Live Interactive Workshops"
          />
        </div>
      </div>
          </div>
        </section>
      </main>
      {/* footer */}
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:flex md:flex-col space-y-14 md:ml-10">
              <div className="mb-4 md:mb-0">
                <Link href="/" className="text-2xl font-bold">
                  Edu<span className="text-red-500">Mastery</span>
                </Link>
              </div>

              <nav className="mb-4 md:mb-0">
                <ul className="flex space-x-4">
                  {[
                    "Courses",
                    "Learn",
                    "Workshops",
                    "Topics",
                    "Teachers",
                    "Reviews",
                    "Guides",
                    "Blog",
                    "FAQ",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="hover:text-gray-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex space-x-4 mb-4 md:mb-0">
              {[
                { name: "Twitter", icon: "./twitter-icon.svg" },
                { name: "LinkedIn", icon: "./linkedin-icon.svg" },
                { name: "Facebook", icon: "./facebook-icon.svg" },
                { name: "Instagram", icon: "./instagram-icon.svg" },
              ].map((social) => (
                <Link
                  key={social.name}
                  href={`https://${social.name.toLowerCase()}.com`}
                  className="hover:opacity-75"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>

            <div className="flex flex-col justify-center items-center">
              <Link href="https://apps.apple.com" className="hover:opacity-75">
                <Image
                  src="/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </Link>
              <Link
                href="https://play.google.com"
                className="hover:opacity-75 md: translate-y-[-3rem]"
              >
                <Image
                  src="/google-play-badge.svg"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                />
              </Link>
            </div>
          </div>

          <div className="mt-4 text-center md:text-left text-sm md:ml-10">
            <p>EduMastery is proudly made in Minneapolis, MN</p>
            <p>Contact: support@edumastery.com</p>
            <p>
              &copy; 2024 Frontend Masters &middot;{" "}
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>{" "}
              &middot;{" "}
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
