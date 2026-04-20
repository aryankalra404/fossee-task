import { useState } from 'react'

export default function Login() {
  const [error, setError] = useState('')

  /**
   * Handle the login submission.
   * Currently focusing on the UI/UX layer; backend integration 
   * would involve a fetch request to the auth endpoint here.
   */
  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Add authentication logic and error handling
  }

  return (
    /* Centering the login card vertically and horizontally for a 
      focused user experience. Added px-4 to prevent the card from 
      touching the screen edges on smaller mobile devices.
    */
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand/Context Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Sign in</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back to FOSSEE Workshops</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl px-6 py-8 shadow-sm">

          {/* Error feedback: Using a high-contrast red-on-light-red 
            palette to ensure visibility without being visually jarring.
          */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              {/* Ensuring semantic association between Label and Input 
                for screen readers (Accessibility).
              */}
              <label className="block text-sm font-medium text-gray-600 mb-1.5" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#e85d04] transition-all"
                placeholder="your username"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#e85d04] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e85d04] text-white text-sm font-semibold rounded-lg py-3 hover:bg-[#c94d00] active:scale-[0.99] transition-all shadow-sm"
            >
              Sign in
            </button>
          </form>

        </div>

        {/* Secondary Actions: Kept subtle to maintain focus on the main login form */}
        <div className="mt-6 flex flex-col gap-3 text-center">
          <a href="/register" className="text-sm text-gray-500 hover:text-[#e85d04] transition-colors">
            New around here? <span className="font-medium underline underline-offset-4">Sign up</span>
          </a>
          <a href="/forgot-password" className="text-xs text-gray-400 hover:text-gray-600">
            Forgot password?
          </a>
        </div>

      </div>
    </div>
  )
}