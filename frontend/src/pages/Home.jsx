export default function Home() {
  const user = { name: 'user' }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-xl border border-gray-200 px-8 py-10">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Welcome {user.name}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your workshop information will be shown here. Go to{' '}
            <span className="font-semibold text-gray-700">Workshop Status</span>{' '}
            to see your workshops, or head to{' '}
            <span className="font-semibold text-gray-700">Propose Workshop</span>{' '}
            to create a new one.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <QuickLink
            title="Workshop Status"
            desc="Check the status of your submitted workshops"
            to="/status"
          />
          <QuickLink
            title="Workshop Types"
            desc="Browse available workshop types and topics"
            to="/types"
          />
          <QuickLink
            title="Workshop Statistics"
            desc="View public stats on workshops conducted"
            to="/statistics"
          />
          <QuickLink
            title="Propose Workshop"
            desc="Submit a new workshop proposal"
            to="/propose"
          />
        </div>

      </div>
    </div>
  )
}

function QuickLink({ title, desc, to }) {
  return (
    <a href={to} className="block bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all">
      <p className="text-sm font-medium text-gray-800 mb-1">{title}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </a>
  )
}