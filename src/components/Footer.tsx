import { FiGithub, FiHeart } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 py-8 dark:border-gray-800">
      <div className="container mx-auto px-6 text-center">
        <p className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <span>Made with</span>
          <FiHeart className="mx-1 h-4 w-4 text-primary" />
          <span>by <span className="font-medium text-primary">Kavy Porwal</span></span>
        </p>

        <div className="mt-4 flex items-center justify-center space-x-4">
          <button
            className="flex items-center rounded-md px-3 py-1 text-sm text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <FiGithub className="mr-1.5 h-4 w-4" />
            <span>Source Code</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          This project is for educational purposes only. Please respect copyright laws and terms of service.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
