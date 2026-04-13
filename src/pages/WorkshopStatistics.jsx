import { useState } from 'react'

const upcomingWorkshops = [
  { id: 1, coordinator: 'Ravi Kumar', institute: 'IIT Bombay', instructor: 'Dr. Sharma', workshop: 'Python', date: '2026-05-10', by: 'Coordinator' },
  { id: 2, coordinator: 'Priya Patil', institute: 'NIT Trichy', instructor: 'Dr. Mehta', workshop: 'Scilab', date: '2026-05-18', by: 'Instructor' },
  { id: 3, coordinator: 'Anil Singh', institute: 'BITS Pilani', instructor: 'Dr. Joshi', workshop: 'eSim', date: '2026-06-02', by: 'Coordinator' },
  { id: 4, coordinator: 'Sneha Rao', institute: 'VIT Vellore', instructor: 'Dr. Nair', workshop: 'OpenFOAM', date: '2026-06-15', by: 'Instructor' },
  { id: 5, coordinator: 'Kiran Das', institute: 'IIT Madras', instructor: 'Dr. Reddy', workshop: 'DWSIM', date: '2026-07-01', by: 'Coordinator' },
  { id: 6, coordinator: 'Meera Iyer', institute: 'IISc Bangalore', instructor: 'Dr. Kumar', workshop: 'R', date: '2026-07-10', by: 'Coordinator' },
]

const monthlyData = [12, 8, 15, 20, 18, 25, 30, 22, 17, 14, 10, 8]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const PER_PAGE = 4

export default function WorkshopStatistics() {
  const [view, setView] = useState('monthly')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(upcomingWorkshops.length / PER_PAGE)
  const visible = upcomingWorkshops.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const maxVal = Math.max(...monthlyData)

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Workshop Statistics</h1>
          <p className="text-sm text-gray-400 mt-1">Overview of workshops conducted across India</p>
        </div>

        <div className="flex gap-2 mb-6">
          {[
            { key: 'monthly', label: 'Monthly Count' },
            { key: 'overall', label: 'Overall Count' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`text-sm px-4 py-1.5 rounded-lg border transition-colors ${
                view === tab.key
                  ? 'bg-[#e85d04] text-white border-[#e85d04]'
                  : 'text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          {view === 'monthly' && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Number of workshops per month — 2026</p>
              <div className="flex items-end gap-2 h-40">
                {monthlyData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400">{val}</span>
                    <div
                      className="w-full bg-[#e85d04] rounded-t opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${(val / maxVal) * 100}%` }}
                    />
                    <span className="text-xs text-gray-400">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'overall' && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { name: 'Python', count: 45 },
                { name: 'Scilab', count: 32 },
                { name: 'eSim', count: 28 },
                { name: 'OpenFOAM', count: 19 },
              ].map(w => (
                <div key={w.name} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-medium text-[#e85d04]">{w.count}</p>
                  <p className="text-sm text-gray-500 mt-1">{w.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-medium text-gray-800">Upcoming Workshops</h2>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Coordinator', 'Institute', 'Instructor', 'Workshop', 'Date', 'Proposed By'].map(col => (
                    <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(w => (
                  <tr key={w.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-800">{w.coordinator}</td>
                    <td className="px-4 py-3 text-gray-600">{w.institute}</td>
                    <td className="px-4 py-3 text-gray-600">{w.instructor}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{w.workshop}</td>
                    <td className="px-4 py-3 text-gray-600">{w.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        w.by === 'Coordinator'
                          ? 'bg-orange-50 text-orange-700 border border-orange-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {w.by}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}