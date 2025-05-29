import { Navbar } from "../(browse)/_components/navbar";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-neutral-500 dark:bg-black text-black dark:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 max-w-3xl mx-auto space-y-8 py-12">
        <h1 className="text-4xl font-bold text-center">Help & Support</h1>

        <section className="w-full bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Feedback</h2>
          <p className="mb-4 text-gray-300">
            We appreciate your feedback. If you have suggestions or found a bug, please let us know.
          </p>
          <a
            href="mailto:limaimpact19@gmail.com"
            className="text-blue-400 hover:underline"
          >
            Send Feedback
          </a>
        </section>

        <section className="w-full bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Customer Support</h2>
          <p className="mb-4 text-gray-300">
            Need help with your account or streaming? Contact our support team.
          </p>
          <a
            href="mailto:supnugga881@gmail.com"
            className="text-blue-400 hover:underline"
          >
            support@dikhabe.com
          </a>
        </section>

        <section className="w-full bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-4 text-gray-300">
            For any other inquiries, feel free to reach out.
          </p>
          <a
            href="mailto:spanzz885@gmail.com"
            className="text-blue-400 hover:underline"
          >
            contact@dikhabe.com
          </a>
        </section>
      </main>
    </div>
  );
}
