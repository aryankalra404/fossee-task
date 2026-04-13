import { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // backend ...
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-lg mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900">Coordinator Registration</h1>
          <p className="text-sm text-gray-400 mt-1">Fill in the details below to create your account</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl px-6 py-8">
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <div className="mt-4">
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <Field
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <Field
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
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
              className="mt-6 w-full bg-[#e85d04] text-white text-sm rounded-lg py-2.5 hover:bg-[#c94d00] transition-colors"
            >
              Register
            </button>

          </form>
        </div>

        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-gray-400 hover:text-gray-700">
            Already have an account? Sign in
          </a>
        </div>

      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1.5" htmlFor={name}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors"
      />
    </div>
  )
}