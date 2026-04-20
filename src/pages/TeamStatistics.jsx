import { useState } from 'react'

/**
 * Statistics Data: 
 * Using an array of objects to simulate a relational data structure. 
 * This makes it easy to map over for both the UI tabs and the data visualizations.
 */
const teams = [
  {
    id: 1,
    members: [
      { name: 'Ravi Kumar', workshops: 12 },
      { name: 'Priya Sharma', workshops: 8 },
      { name: 'Anil Mehta', workshops: 15 },
      { name: 'Sneha Patil', workshops: 6 },
    ],
  },
  {
    id: 2,
    members: [
      { name: 'Kiran Das', workshops: 10 },
      { name: 'Meera Iyer', workshops: 14 },
      { name: 'Raj Patel', workshops: 9 },
    ],
  },
  {
    id: 3,
    members: [
      { name: 'Suresh Nair', workshops: 7 },
      { name: 'Anita Joshi', workshops: 11 },
      { name: 'Vivek Reddy', workshops: 13 },
      { name: 'Pooja Singh', workshops: 5 },
    ],
  },
]

export default function TeamStatistics() {
  const [activeTeam, setActiveTeam] = useState(1)

  // Memoization-like logic: Finding the active team data and calculating 
  // the maximum value for chart scaling on every selection change.
  const team = teams.find(t => t.id === activeTeam)
  const maxVal = Math.max(...team.members.map(m => m.workshops))

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Team Statistics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analyzing workshop impact per coordinator
          </p>
        </div>

        {/* Responsive Layout Strategy:
            - Desktop: Sidebar-style navigation for team selection.
            - Mobile: Horizontal scrollable tabs to save vertical space.
        */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-start">

          {/* Navigation Sidebar/Tabs */}
          <div className="w-full md:w-48 flex-shrink-0">
            <p className="hidden md:block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
              Select Team
            </p>
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {teams.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTeam(t.id)}
                  className={`shrink-0 text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all font-medium border ${
                    activeTeam === t.id
                      ? 'bg-[#e85d04] text-white border-[#e85d04] shadow-md'
                      : 'text-gray-600 border-gray-200 bg-white hover:border-gray-300 active:scale-95'
                  }`}
                >
                  Team {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Main Visualization Area */}
          <div className="flex-1 min-w-0 w-full">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-gray-800">
                  Performance: Team {activeTeam}
                </h3>
                <span className="text-[10px] bg-orange-50 text-[#e85d04] px-2 py-1 rounded font-bold uppercase">
                  Live View
                </span>
              </div>

              {/* Custom Bar Chart: 
                  Instead of using a heavy library (e.g., Chart.js), I built this using 
                  Tailwind and Flexbox for maximum performance and faster load times.
                  - minWidth on container prevents "squishing" on small mobile screens.
                  - Relative height percentage ensures the chart is always proportional.
              */}
              <div className="overflow-x-auto mb-10 pb-4">
                <div 
                  className="flex items-end gap-3 sm:gap-6" 
                  style={{ height: '160px', minWidth: `${team.members.length * 70}px` }}
                >
                  {team.members.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group" style={{ height: '100%' }}>
                      <div className="flex-1 w-full flex items-end">
                        <div
                          className="w-full bg-[#e85d04]/10 border-b-2 border-[#e85d04] rounded-t-lg transition-all duration-300 group-hover:bg-[#e85d04] cursor-help relative"
                          style={{ height: `${(m.workshops / maxVal) * 100}%`, minHeight: '8px' }}
                        >
                          {/* Tooltip-like value display on hover */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {m.workshops}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-900">{m.workshops}</p>
                        <p className="text-[10px] text-gray-400 font-medium truncate w-full">
                          {m.name.split(' ')[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Table View: 
                  Used as a fallback for accessibility, ensuring that users with 
                  screen readers can still parse the data easily.
              */}
              <div className="border-t border-gray-100 pt-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-50">
                      <th className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-3">Member</th>
                      <th className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-3 text-right">Workshops</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.members.map((m, i) => (
                      <tr key={i} className="group border-b border-gray-50 last:border-0">
                        <td className="py-4 text-sm font-medium text-gray-700 group-hover:text-[#e85d04] transition-colors">
                          {m.name}
                        </td>
                        <td className="py-4 text-sm text-gray-600 text-right font-mono">
                          {m.workshops}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}