import { useState } from 'react'

const allWorkshops = [
  { id: 1, name: 'Python', duration: 2 },
  { id: 2, name: 'Scilab', duration: 3 },
  { id: 3, name: 'eSim', duration: 2 },
  { id: 4, name: 'OpenFOAM', duration: 4 },
  { id: 5, name: 'DWSIM', duration: 2 },
  { id: 6, name: 'Osdag', duration: 3 },
  { id: 7, name: 'Spoken Tutorial', duration: 1 },
  { id: 8, name: 'R', duration: 2 },
]

const PER_PAGE = 5

export default function WorkshopTypes() {
  const [page, setPage] = useState(1)
  const isInstructor = true // swap with auth context later

  const totalPages = Math.ceil(allWorkshops.length / PER_PAGE)
  const visible = allWorkshops.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Workshop Types</h1>
            <p className="text-sm text-gray-400 mt-1">Available workshops you can propose</p>
          </div>
          {isInstructor && (
          <a href="/types/add" className="text-sm bg-[#e85d04] text-white px-4 py-2 rounded-lg hover:bg-[#c94d00] transition-colors">
            Add Workshop Type
          </a>
        )}
          
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide w-12">Sr</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Workshop Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Duration (Days)</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((w, i) => (
                  <tr key={w.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{w.name}</td>
                    <td className="px-4 py-3 text-gray-600">{w.duration}</td>
                    <td className="px-4 py-3">
                      
                    <a href={`/types/${w.id}`} className="text-xs text-[#e85d04] border border-[#e85d04] px-3 py-1 rounded-lg hover:bg-orange-50 transition-colors">
                      View Details
                    </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
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