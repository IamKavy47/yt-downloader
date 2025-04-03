import { useState } from "react";
import { FiDownload, FiMusic, FiVideo } from "react-icons/fi";
import toast from "react-hot-toast";

// Define proper types
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

interface VideoDetailsProps {
  videoData: VideoData;
}

const VideoDetails = ({ videoData }: VideoDetailsProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("mp4");
  const [selectedQuality, setSelectedQuality] = useState<string>("");

  // Filter formats based on selected format type (mp3 or mp4)
  const filteredFormats = videoData.formats.filter(
    (format) => format.format === selectedFormat
  );

  // Select first quality option by default when format changes
  if (filteredFormats.length > 0 && !selectedQuality) {
    setSelectedQuality(filteredFormats[0].quality);
  }

  // Get the selected format details for download button
  const selectedFormatDetails = videoData.formats.find(
    (format) => format.format === selectedFormat && format.quality === selectedQuality
  );

  const handleDownload = () => {
    // In a real application, this would trigger an actual download
    // For demo purposes, we'll just show a toast
    toast.success(`Starting download: ${videoData.title} (${selectedFormat} - ${selectedQuality})`);

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        toast.loading(`Downloading: ${progress}%`, { id: "download-progress" });
      } else {
        clearInterval(interval);
        toast.success("Download complete! (Demo only - no actual file was downloaded)", { id: "download-progress", duration: 4000 });
      }
    }, 500);
  };

  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="grid gap-6 p-6 md:grid-cols-2">
        {/* Video Thumbnail & Basic Info */}
        <div className="flex flex-col space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <img
              src={videoData.thumbnail}
              alt={videoData.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback if maxresdefault doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = `https://i.ytimg.com/vi/${videoData.id}/hqdefault.jpg`;
              }}
            />
            <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
              {videoData.duration}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{videoData.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">By {videoData.author}</p>
          </div>
        </div>

        {/* Download Options */}
        <div className="flex flex-col space-y-6">
          <div className="rounded-md bg-gray-50 p-5 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Download Options</h3>

            {/* Format Selection */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Format
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedFormat("mp4");
                    setSelectedQuality("");
                  }}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    selectedFormat === "mp4"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
                  }`}
                >
                  <FiVideo className="h-4 w-4" />
                  MP4
                </button>
                <button
                  onClick={() => {
                    setSelectedFormat("mp3");
                    setSelectedQuality("");
                  }}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    selectedFormat === "mp3"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
                  }`}
                >
                  <FiMusic className="h-4 w-4" />
                  MP3
                </button>
              </div>
            </div>

            {/* Quality Selection */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quality
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {filteredFormats.map((format) => (
                  <button
                    key={format.quality}
                    onClick={() => setSelectedQuality(format.quality)}
                    className={`rounded-md px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                      selectedQuality === format.quality
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
                    }`}
                  >
                    {format.quality}
                  </button>
                ))}
              </div>
            </div>

            {/* File Size */}
            {selectedFormatDetails && (
              <div className="mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">File size:</span>{" "}
                  <span className="font-semibold text-primary">
                    {selectedFormatDetails.size}
                  </span>
                </p>
              </div>
            )}

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={!selectedQuality}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900"
            >
              <FiDownload className="h-5 w-5" />
              Download
            </button>
            <p className="mt-4 text-center text-xs text-gray-500">
              Demo only - no actual files will be downloaded
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
