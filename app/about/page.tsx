import { Navbar } from "../(browse)/_components/navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-500 dark:bg-black text-black dark:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold">About Dikhabe</h1>
          <p className="text-lg text-gray-300">
            <strong>Dikhabe</strong> is a next-generation live streaming platform built to empower creators and connect audiences in real time. Whether you're gaming, teaching, performing, or sharing everyday moments — Dikhabe provides the tools and performance to broadcast it all.
          </p>
          <p className="text-gray-400">
            Built using modern technologies like <strong>Next.js</strong>, <strong>LiveKit</strong>, and <strong>WebRTC</strong>, Dikhabe ensures low-latency, high-quality streams for everyone.
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Dikhabe. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
