import { useNavigate } from 'react-router-dom'

/**
 * Mock data for recent activity. 
 * Kept outside the component to prevent re-declaration on every render.
 */
const recentActivity = [
  { id: 1, text: 'Python workshop accepted', date: 'May 10, 2026', status: 'accepted' },
  { id: 2, text: 'Scilab workshop proposed', date: 'Apr 28, 2026', status: 'pending' },
  { id: 3, text: 'eSim workshop completed', date: 'Apr 10, 2026', status: 'completed' },
]

/**
 * Centralized status theme mapping.
 * Using a systematic approach here makes it easy to update the branding 
 * or add new status types (e.g., 'rejected') in one place.
 */
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
      {/* Max-width constraint keeps the dashboard readable on tablets 
        while allowing the cards to stack naturally on mobile.
      */}
      <div className="max-w-2xl mx-auto">

        {/* Hero / Greeting Section - High Visual Hierarchy */}
        <div className="bg-white border border-gray-200 rounded-xl px-8 py-8 mb-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-2 italic">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Here's a summary of your workshop activity.
          </p>
        </div>

        {/* Stats Grid: Optimized for Mobile.
          2-column layout ensures numbers stay large and legible on small screens 
          without horizontal scrolling.
        */}
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

        {/* Activity List: Uses a card-list pattern for better readability than a table on mobile */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
              Recent Activity
            </h2>
          </div>
          
          {recentActivity.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50 ${
                i !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{item.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
              </div>
              {/* Semantic color coding for quick scanning */}
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter ${statusStyles[item.status]}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Primary Call-To-Action (CTA).
          Full-width button for "Fat Thumb" ergonomics on mobile devices.
        */}
        <button
          onClick={() => navigate('/propose')}
          className="w-full bg-[#e85d04] text-white text-sm font-semibold rounded-xl py-4 shadow-sm hover:shadow-md hover:bg-[#c94d00] active:scale-[0.98] transition-all"
        >
          Propose a New Workshop
        </button>

      </div>
    </div>
  )
}