import ShortenForm from "./components/ShortenForm";

/**
 * Main App component.
 * Follows Single Responsibility Principle by being a simple container.
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>
        <ShortenForm />
      </div>
    </div>
  );
}

export default App;
