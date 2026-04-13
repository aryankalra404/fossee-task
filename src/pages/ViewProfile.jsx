const profile = {
  firstName: 'Aryan',
  lastName: 'Kalra',
  email: 'aryan@fossee.in',
  institute: 'IIT Bombay',
  phone: '+91 98765 43210',
  department: 'Computer Science',
  location: 'Mumbai',
  position: 'Coordinator',
}

const workshops = [
  { id: 1, instructor: 'Dr. Sharma', date: 'May 10, 2026', type: 'Python' },
  { id: 2, instructor: null, date: 'Jun 15, 2026', type: 'Scilab' },
  { id: 3, instructor: 'Dr. Mehta', date: 'Apr 10, 2026', type: 'eSim' },
]

export default function ViewProfile() {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium text-gray-900">Profile</h1>
          
           <a href="/profile/edit"
            className="text-sm bg-[#e85d04] text-white px-4 py-2 rounded-lg hover:bg-[#c94d00] transition-colors"
          >
            Edit Profile
          </a>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-[#e85d04] text-white font-medium flex items-center justify-center text-lg">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <div>
              <p className="text-base font-medium text-gray-900">{profile.firstName} {profile.lastName}</p>
              <p className="text-sm text-gray-400">{profile.position} — {profile.institute}</p>
            </div>
          </div>

          {[
            { label: 'Email', value: profile.email },
            { label: 'Phone', value: profile.phone },
            { label: 'Department', value: profile.department },
            { label: 'Location', value: profile.location },
            { label: 'Position', value: profile.position },
          ].map((row, i, arr) => (
            <div key={i} className={`flex items-center px-6 py-3 ${i !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <p className="w-32 text-sm text-gray-400 shrink-0">{row.label}</p>
              <p className="text-sm text-gray-800">{row.value}</p>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-medium text-gray-700 mb-4">Workshop History</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Instructor', 'Date', 'Workshop'].map(col => (
                    <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workshops.map((w, i) => (
                  <tr key={w.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      {w.instructor
                        ? <span className="text-gray-700">{w.instructor}</span>
                        : <span className="text-xs px-2 py-1 rounded-md font-medium bg-orange-50 text-orange-700 border border-orange-200">Pending</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-gray-600">{w.date}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{w.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}