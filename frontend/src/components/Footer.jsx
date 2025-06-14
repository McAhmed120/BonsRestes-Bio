import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="w-full bg-gradient-to-t from-gray-900 via-gray-900/90 to-emerald-900/80 text-gray-300 py-10 border-t border-emerald-800 mt-16">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <span className="text-2xl font-bold text-emerald-400">EcoPulse</span>
        <span className="hidden md:inline text-sm text-gray-400 ml-2">Eco-friendly E-commerce</span>
      </div>
      <div className="flex gap-6 items-center text-lg">
        <Link to="#" className="hover:text-emerald-400 transition">Privacy Policy</Link>
        <Link to="#" className="hover:text-emerald-400 transition">Terms</Link>
        <a href="mailto:support@ecopulse.com" className="hover:text-emerald-400 transition">Contact</a>
      </div>
      <div className="flex gap-4 items-center">
        <a href="#" aria-label="Twitter" className="hover:text-emerald-400 transition">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg>
        </a>
        <a href="#" aria-label="GitHub" className="hover:text-emerald-400 transition">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-emerald-400 transition">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.81 2.256 6.09 2.243 6.5 2.243 12c0 5.5.013 5.91.072 7.19.059 1.278.353 2.451 1.32 3.418.967.967 2.14 1.261 3.418 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.278-.059 2.451-.353 3.418-1.32.967-.967 1.261-2.14 1.32-3.418.059-1.28.072-1.69.072-7.19 0-5.5-.013-5.91-.072-7.19-.059-1.278-.353-2.451-1.32-3.418C19.399.425 18.226.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
      </div>
    </div>
    <div className="mt-8 text-center text-xs text-gray-500">
      &copy; {new Date().getFullYear()} EcoPulse. All rights reserved.
    </div>
  </footer>
);

export default Footer;
