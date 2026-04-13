import { useState } from 'react'

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

  const team = teams.find(t => t.id === activeTeam)
  const maxVal = Math.max(...team.members.map(m => m.workshops))

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Team Statistics</h1>
          <p className="text-sm text-gray-400 mt-1">Workshops conducted per team member</p>
        </div>

        <div className="flex gap-6">

          <div className="w-36 shrink-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Teams</p>
            <ul className="flex flex-col gap-1">
              {teams.map((t, i) => (
                <li key={t.id}>
                  <button
                    onClick={() => setActiveTeam(t.id)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      activeTeam === t.id
                        ? 'bg-[#e85d04] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Team {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500 mb-6">
              Team {activeTeam} — workshops per member
            </p>

            <div className="flex items-end gap-3 h-48 mb-4">
              {team.members.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400">{m.workshops}</span>
                  <div
                    className="w-full bg-[#e85d04] rounded-t opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${(m.workshops / maxVal) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400 text-center leading-tight">{m.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="text-xs font-medium text-gray-500 uppercase tracking-wide pb-2">Member</th>
                    <th className="text-xs font-medium text-gray-500 uppercase tracking-wide pb-2">Workshops</th>
                  </tr>
                </thead>
                <tbody>
                  {team.members.map((m, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="py-2 text-gray-700">{m.name}</td>
                      <td className="py-2 text-gray-600">{m.workshops}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}