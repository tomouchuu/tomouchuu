export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to my personal website. This is the about page where you can
          learn more about me and my work.
        </p>
        <p className="text-gray-600">
          Feel free to explore and get in touch if you have any questions or
          opportunities to collaborate.
        </p>
      </div>
    </div>
  );
}
