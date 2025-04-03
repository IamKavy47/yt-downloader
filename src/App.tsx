import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar";
import VideoDetails from "./components/VideoDetails";
import Footer from "./components/Footer";

// Import VideoData type
interface Format {
  format: string;
  quality: string;
  size: string;
}

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: Format[];
}

function App() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <header className="border-b border-gray-200 py-6 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <h1 className="text-center text-3xl font-bold text-primary md:text-4xl">
            YouTube Downloader
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Download videos in MP3 or MP4 format with quality selection
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <SearchBar setVideoData={setVideoData} setLoading={setLoading} setError={setError} />

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/20 dark:bg-red-900/10 dark:text-red-400">
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-gray-300 opacity-25 dark:border-gray-600" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Fetching video data...</p>
          </div>
        )}

        {videoData && !loading && <VideoDetails videoData={videoData} />}

        {!videoData && !loading && !error && (
          <div className="mx-auto mt-12 max-w-lg rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex justify-center">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">Enter a YouTube URL</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Paste a YouTube video URL in the search bar above to view download options
            </p>
            <p className="mt-6 text-xs text-gray-500">
              Note: This is a demo application. Downloads are simulated for demonstration purposes only.
            </p>
          </div>
        )}
      </main>

      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              border: '1px solid #dcfce7',
              color: '#166534',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              border: '1px solid #fee2e2',
              color: '#b91c1c',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
