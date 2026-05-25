import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-100 p-8">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accblue1-500/10 text-blue2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Please enter your details to sign in
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 bg-stone-50/50 placeholder-stone-400 focus:outline-hidden focus:border-accblue1-500 focus:bg-white transition-all text-sm"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-stone-600 uppercase tracking-wider"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 bg-stone-50/50 placeholder-stone-400 focus:outline-hidden focus:border-accblue1-500 focus:bg-white transition-all text-sm"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded-sm border-stone-300 text-accgreen focus:ring-accgreen/20 accent-accgreen cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-stone-600 select-none cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-accsage text-white font-semibold hover:bg-accgreen shadow-md shadow-accsage/10 transition-colors cursor-pointer mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-stone-100">
          <p className="text-sm text-stone-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue2 hover:text-accblue1-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
