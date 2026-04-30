import { useState } from 'react'

/**
 * Coordinator Registration Flow.
 * I've opted for a single-page long-form approach but utilized a grid 
 * system to keep it compact on larger screens while stacking on mobile.
 */
export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
  })

  /**
   * Generic Change Handler: 
   * This reduces boilerplate by using the input's 'name' attribute 
   * to update the corresponding state key.
   */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Implement registration logic & password matching validation
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-lg mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Coordinator Registration
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Join the FOSSEE community to start proposing workshops.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-8 shadow-sm">
          <form onSubmit={handleSubmit}>

            {/* Responsive Grid: 
                Splits Name into two columns on desktop (sm:grid-cols-2) 
                but stacks them on mobile to maintain input width and legibility.
            */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <Field
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5">
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5 border-t border-gray-50 pt-5">
              <Field
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5">
              <Field
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5">
              <Field
                label="Confirm Password"
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-[#e85d04] text-white text-sm font-bold rounded-xl py-4 hover:bg-[#c94d00] shadow-sm active:scale-[0.98] transition-all"
            >
              Create Account
            </button>

          </form>
        </div>

        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Already have an account? <span className="text-[#e85d04] font-medium">Sign in</span>
          </a>
        </div>

      </div>
    </div>
  )
}

/**
 * Reusable Input Component.
 * Abstracting this ensures consistent styling and accessibility across 
 * the entire form. If we need to change the focus ring color or 
 * padding, we only do it here once.
 */
function Field({ label, name, type = 'text', value, onChange, required }) {
  return (
    <div className="w-full">
      <label 
        className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2" 
        htmlFor={name}
      >
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        // focus:ring-2 provides a clear visual indicator for keyboard navigation (Accessibility)
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50/30 outline-none focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-[#e85d04] transition-all"
      />
    </div>
  )
}