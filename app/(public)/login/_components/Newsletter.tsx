export default function Newsletter() {
  return (
    <section className="bg-sky-100 py-20 rounded-4xl mb-24">

      <div className="mx-auto max-w-4xl text-center">

        <h2 className="text-4xl font-bold">
          Join our newsletter
        </h2>

        <p className="mt-4 text-gray-600">
          Join over half a million vitamin lovers.
        </p>

        <div className="mt-8 flex gap-4 justify-center">

          <input
            placeholder="Email"
            className="w-96 rounded-full p-4 bg-white"
          />

          <button className="rounded-full bg-green-500 px-8 text-white">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}