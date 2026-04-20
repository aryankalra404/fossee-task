/**
 * Profile and Workshop Data.
 * In a production environment, this would be fetched from a 
 * secure API endpoint using a hook like useEffect or React Query.
 */
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

        {/* Header Section: Clear CTA placement. 
            On mobile, keeping the 'Edit' button at the top ensures 
            it's easily accessible without scrolling through data.
        */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Profile</h1>
          
           <a href="/profile/edit"
            className="text-xs md:text-sm font-semibold bg-[#e85d04] text-white px-5 py-2.5 rounded-xl hover:bg-[#c94d00] transition-all shadow-sm active:scale-95"
          >
            Edit Profile
          </a>
        </div>

        {/* User Card: Focus on Visual Identity.
            Using initials for the avatar ensures a personalized feel 
            even before a user uploads a photo.
        */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-10 shadow-sm">
          <div className="flex items-center gap-5 px-6 py-6 border-b border-gray-50 bg-gray-50/20">
            <div className="w-14 h-14 rounded-full bg-[#e85d04] text-white font-bold flex items-center justify-center text-xl shadow-inner">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 leading-tight">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-sm text-gray-500 font-medium mt-1">
                {profile.position} <span className="mx-1 text-gray-300">•</span> {profile.institute}
              </p>
            </div>
          </div>

          {/* Details List: Clean Key-Value mapping for readability. 
              Using a 32-unit fixed width for labels ensures a clean 
              vertical alignment ('gutter') that guides the eye.
          */}
          {[
            { label: 'Email', value: profile.email },
            { label: 'Phone', value: profile.phone },
            { label: 'Department', value: profile.department },
            { label: 'Location', value: profile.location },
          ].map((row, i, arr) => (
            <div key={i} className={`flex items-start md:items-center px-6 py-4 ${i !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <p className="w-24 md:w-32 text-[11px] font-bold text-gray-400 uppercase tracking-widest shrink-0 mt-1 md:mt-0">
                {row.label}
              </p>
              <p className="text-sm text-gray-700 font-medium break-all">{row.value}</p>
            </div>
          ))}
        </div>

        {/* Workshop History Section:
            Responsive Table Handling: Wrapped in overflow-x-auto to prevent 
            layout breaking on narrow screens while maintaining data integrity.
        */}
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">Workshop History</h2>
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  {['Instructor', 'Date', 'Workshop'].map(col => (
                    <th key={col} className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {workshops.map((w) => (
                  <tr key={w.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      {w.instructor
                        ? <span className="text-gray-700 font-medium">{w.instructor}</span>
                        : <span className="text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-tighter bg-orange-50 text-orange-600 border border-orange-100">
                            Assignment Pending
                          </span>
                      }
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{w.date}</td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-bold group-hover:text-[#e85d04] transition-colors">
                        {w.type}
                      </span>
                    </td>
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