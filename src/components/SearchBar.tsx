import { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

// Define proper VideoData type
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

interface SearchBarProps {
  setVideoData: (data: VideoData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const SearchBar = ({ setVideoData, setLoading, setError }: SearchBarProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic URL validation
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    // Check if it's a YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // In a real application, this would be a backend API call
      // For demo purposes, we'll simulate the API response

      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Extract video ID from URL
      let videoId = "";
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }

      // Mock data response
      const mockData: VideoData = {
        id: videoId,
        title: "Sample YouTube Video",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        duration: "10:30",
        author: "YouTube Creator",
        formats: [
          { format: "mp4", quality: "360p", size: "20 MB" },
          { format: "mp4", quality: "720p", size: "45 MB" },
          { format: "mp4", quality: "1080p", size: "90 MB" },
          { format: "mp3", quality: "128kbps", size: "10 MB" },
          { format: "mp3", quality: "256kbps", size: "18 MB" },
          { format: "mp3", quality: "320kbps", size: "25 MB" },
        ],
      };

      setVideoData(mockData);
      toast.success("Video information retrieved successfully");
    } catch (error) {
      console.error("Error fetching video data:", error);
      setError("Failed to fetch video data. Please try again.");
      toast.error("Failed to fetch video data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube video URL here"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Get Video
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
