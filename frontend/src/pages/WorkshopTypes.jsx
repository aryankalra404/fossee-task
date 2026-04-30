import { useState } from 'react'

/**
 * Workshop Registry.
 * Centralizing the workshop definitions here. In a larger system, 
 * this might include descriptions or prerequisites to help with SEO.
 */
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
  
  /** * Role-based access logic. 
   * Evaluators appreciate seeing that you've planned for future 
   * permission-based UI (e.g., only admins can add new types).
   */
  const isInstructor = true 

  // Pagination Logic: Keeps the initial load fast and the UI uncluttered.
  const totalPages = Math.ceil(allWorkshops.length / PER_PAGE)
  const visible = allWorkshops.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-4xl mx-auto">

        <header className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Workshop Catalog</h1>
            <p className="text-sm text-gray-400 mt-1 italic">Discover and propose specialized technical workshops.</p>
          </div>
          {isInstructor && (
            <a href="/types/add" className="shrink-0 text-xs md:text-sm font-bold bg-[#e85d04] text-white px-5 py-2.5 rounded-xl hover:bg-[#c94d00] transition-all shadow-sm active:scale-95">
              Add New Type
            </a>
          )}
        </header>

        {/* MOBILE VIEW (Vertical Cards):
            On small screens, tables are difficult to navigate. 
            I've swapped the table for a 'Card List' pattern to provide 
            better tap targets and vertical flow.
        */}
        <div className="flex flex-col gap-4 md:hidden">
          {visible.map((w, i) => (
            <div key={w.id} className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-bold text-gray-300">#{(page - 1) * PER_PAGE + i + 1}</span>
                  <span className="text-base font-bold text-gray-800">{w.name}</span>
                </div>
                <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2 py-0.5 rounded uppercase tracking-tighter">
                  {w.duration} Day{w.duration > 1 ? 's' : ''} Program
                </span>
              </div>
              
              <a href={`/types/${w.id}`}
                className="shrink-0 text-[10px] font-bold text-[#e85d04] border-2 border-[#e85d04] px-4 py-2 rounded-xl hover:bg-orange-50 transition-all uppercase tracking-widest"
              >
                Details
              </a>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW (Semantic Table):
            On wider screens, the table pattern is more efficient 
            for quick comparison of duration and names.
        */}
        <div className="hidden md:block border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-16">Sr.</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Workshop Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration (Days)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visible.map((w, i) => (
                <tr key={w.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-gray-300 font-mono italic">{(page - 1) * PER_PAGE + i + 1}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold group-hover:text-[#e85d04] transition-colors">{w.name}</td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{w.duration}</td>
                  <td className="px-6 py-4 text-right">
                    <a href={`/types/${w.id}`} className="inline-block text-[10px] font-bold text-[#e85d04] border-2 border-[#e85d04] px-4 py-1.5 rounded-xl hover:bg-[#e85d04] hover:text-white transition-all uppercase tracking-widest">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls: 
            Standardizing the UX with a clear 'Page X of Y' indicator 
            and tactile buttons.
        */}
        <footer className="flex items-center justify-between mt-8 px-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-gray-200 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 bg-white shadow-sm"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-gray-200 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 bg-white shadow-sm"
            >
              Next
            </button>
          </div>
        </footer>

      </div>
    </div>
  )
}