import { useState } from 'react'

export default function Login() {
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // backend ...
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900">Sign in</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back to FOSSEE Workshops</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl px-6 py-8">

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1.5" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors"
                placeholder="your username"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e85d04] text-white text-sm rounded-lg py-2.5 hover:bg-[#c94d00] transition-colors"
            >
              Sign in
            </button>
          </form>

        </div>

        <div className="mt-4 flex flex-col gap-2 text-center">
          <a href="/register" className="text-sm text-gray-500 hover:text-gray-800">
            New around here? Sign up
          </a>
          <a href="/forgot-password" className="text-sm text-gray-400 hover:text-gray-600">
            Forgot password?
          </a>
        </div>

      </div>
    </div>
  )
}