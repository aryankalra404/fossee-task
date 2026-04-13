import { useNavigate } from 'react-router-dom'

const recentActivity = [
  { id: 1, text: 'Python workshop accepted', date: 'May 10, 2026', status: 'accepted' },
  { id: 2, text: 'Scilab workshop proposed', date: 'Apr 28, 2026', status: 'pending' },
  { id: 3, text: 'eSim workshop completed', date: 'Apr 10, 2026', status: 'completed' },
]

const statusStyles = {
  accepted: 'bg-green-50 text-green-700 border border-green-200',
  pending: 'bg-orange-50 text-orange-700 border border-orange-200',
  completed: 'bg-blue-50 text-blue-700 border border-blue-200',
}

export default function Home() {
  const user = { name: 'Aryan' }
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-xl px-8 py-8 mb-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Here's a summary of your workshop activity.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-3xl font-medium text-[#e85d04]">3</p>
            <p className="text-sm text-gray-500 mt-1">Your Workshops</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-3xl font-medium text-yellow-500">1</p>
            <p className="text-sm text-gray-500 mt-1">Pending Approval</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-3xl font-medium text-blue-500">2</p>
            <p className="text-sm text-gray-500 mt-1">Upcoming</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-3xl font-medium text-green-500">5</p>
            <p className="text-sm text-gray-500 mt-1">Completed</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-700">Recent Activity</h2>
          </div>
          {recentActivity.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between px-6 py-4 ${
                i !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md font-medium ${statusStyles[item.status]}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/propose')}
          className="w-full bg-[#e85d04] text-white text-sm rounded-xl py-3 hover:bg-[#c94d00] transition-colors"
        >
          Propose a Workshop
        </button>

      </div>
    </div>
  )
}