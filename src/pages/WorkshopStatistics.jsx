import { useState } from 'react'

const upcomingWorkshops = [
  { id: 1, coordinator: 'Ravi Kumar', institute: 'IIT Bombay', instructor: 'Dr. Sharma', workshop: 'Python', date: '2026-05-10', by: 'Coordinator' },
  { id: 2, coordinator: 'Priya Patil', institute: 'NIT Trichy', instructor: 'Dr. Mehta', workshop: 'Scilab', date: '2026-05-18', by: 'Instructor' },
  { id: 3, coordinator: 'Anil Singh', institute: 'BITS Pilani', instructor: 'Dr. Joshi', workshop: 'eSim', date: '2026-06-02', by: 'Coordinator' },
  { id: 4, coordinator: 'Sneha Rao', institute: 'VIT Vellore', instructor: 'Dr. Nair', workshop: 'OpenFOAM', date: '2026-06-15', by: 'Instructor' },
  { id: 5, coordinator: 'Kiran Das', institute: 'IIT Madras', instructor: 'Dr. Reddy', workshop: 'DWSIM', date: '2026-07-01', by: 'Coordinator' },
  { id: 6, coordinator: 'Meera Iyer', institute: 'IISc Bangalore', instructor: 'Dr. Kumar', workshop: 'R', date: '2026-07-10', by: 'Coordinator' },
  { id: 7, coordinator: 'Arjun Verma', institute: 'IIT Delhi', instructor: 'Dr. Gupta', workshop: 'Python', date: '2026-07-20', by: 'Instructor' },
  { id: 8, coordinator: 'Divya Nair', institute: 'NSIT Delhi', instructor: 'Dr. Pillai', workshop: 'Scilab', date: '2026-08-05', by: 'Coordinator' },
]

const workshopTypes = ['All', 'Python', 'Scilab', 'eSim', 'OpenFOAM', 'DWSIM', 'R']
const states = ['All', 'Maharashtra', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Delhi', 'Kerala']
const monthlyData = [12, 8, 15, 20, 18, 25, 30, 22, 17, 14, 10, 8]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const overallData = [
  { name: 'Python', count: 45 },
  { name: 'Scilab', count: 32 },
  { name: 'eSim', count: 28 },
  { name: 'OpenFOAM', count: 19 },
  { name: 'DWSIM', count: 14 },
  { name: 'R', count: 11 },
]
const pieColors = ['#e85d04', '#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444']
const PER_PAGE = 4

function FilterPanel({ fromDate, setFromDate, toDate, setToDate, workshopFilter, setWorkshopFilter,
  stateFilter, setStateFilter, sortOrder, setSortOrder, myWorkshopsOnly, setMyWorkshopsOnly,
  clearFilters, handleDownload, setPage }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800 underline">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-xs px-3 py-1.5 border border-[#e85d04] text-[#e85d04] rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-1"
        >
          ✕ Clear
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">From date:</label>
          <input type="date" value={fromDate}
            onChange={e => { setFromDate(e.target.value); setPage(1) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#e85d04]" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">To date:</label>
          <input type="date" value={toDate}
            onChange={e => { setToDate(e.target.value); setPage(1) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#e85d04]" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Workshop:</label>
          <select value={workshopFilter} onChange={e => { setWorkshopFilter(e.target.value); setPage(1) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#e85d04]">
            {workshopTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">State:</label>
          <select value={stateFilter} onChange={e => { setStateFilter(e.target.value); setPage(1) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#e85d04]">
            {states.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Sort by:</label>
          <select value={sortOrder} onChange={e => { setSortOrder(e.target.value); setPage(1) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#e85d04]">
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="flex items-center gap-2 sm:col-span-2 md:col-span-1">
          <input type="checkbox" id="myOnly" checked={myWorkshopsOnly}
            onChange={e => { setMyWorkshopsOnly(e.target.checked); setPage(1) }}
            className="w-4 h-4 rounded border-gray-300 accent-[#e85d04]" />
          <label htmlFor="myOnly" className="text-sm text-gray-600">Show my workshops only</label>
        </div>
        <div className="flex gap-2 pt-1 sm:col-span-2 md:col-span-1">
          <button onClick={() => setPage(1)}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            View
          </button>
          <button onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm py-2 rounded-lg transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default function WorkshopStatistics() {
  const [view, setView] = useState('monthly')
  const [page, setPage] = useState(1)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [workshopFilter, setWorkshopFilter] = useState('All')
  const [stateFilter, setStateFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('oldest')
  const [myWorkshopsOnly, setMyWorkshopsOnly] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  let filtered = [...upcomingWorkshops]
  if (workshopFilter !== 'All') filtered = filtered.filter(w => w.workshop === workshopFilter)
  if (myWorkshopsOnly) filtered = filtered.filter(w => w.by === 'Coordinator')
  if (fromDate) filtered = filtered.filter(w => w.date >= fromDate)
  if (toDate) filtered = filtered.filter(w => w.date <= toDate)
  filtered = filtered.sort((a, b) =>
    sortOrder === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
  )

  const totalPages = Math.max(Math.ceil(filtered.length / PER_PAGE), 1)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const maxVal = Math.max(...monthlyData)
  const totalOverall = overallData.reduce((s, w) => s + w.count, 0)

  let cumulative = 0
  const pieSegments = overallData.map((item, i) => {
    const pct = item.count / totalOverall
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    cumulative += pct
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2
    const r = 80, cx = 100, cy = 100
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const largeArc = pct > 0.5 ? 1 : 0
    return { ...item, path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`, color: pieColors[i] }
  })

  const filterProps = {
    fromDate, setFromDate, toDate, setToDate,
    workshopFilter, setWorkshopFilter,
    stateFilter, setStateFilter,
    sortOrder, setSortOrder,
    myWorkshopsOnly, setMyWorkshopsOnly,
    setPage,
    clearFilters: () => {
      setFromDate(''); setToDate(''); setWorkshopFilter('All')
      setStateFilter('All'); setSortOrder('oldest'); setMyWorkshopsOnly(false); setPage(1)
    },
    handleDownload: () => {
      const csv = [
        ['Sr No.', 'Coordinator', 'Institute', 'Instructor', 'Workshop', 'Date', 'Proposed By'],
        ...filtered.map((w, i) => [i + 1, w.coordinator, w.institute, w.instructor, w.workshop, w.date, w.by])
      ].map(r => r.join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = 'workshops.csv'; a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-medium text-gray-900">Workshop Statistics</h1>
            <p className="text-sm text-gray-400 mt-1">Overview of workshops conducted across India</p>
          </div>
          {/* Mobile filter toggle button */}
          <button
            onClick={() => setDrawerOpen(o => !o)}
            className="md:hidden flex items-center gap-2 text-sm px-3 py-2 border border-gray-200 bg-white rounded-lg text-gray-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Filters
          </button>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="md:hidden mb-6">
            <FilterPanel {...filterProps} />
          </div>
        )}

        <div className="flex gap-6 items-start">

          {/* Sidebar — desktop only */}
          <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
            <FilterPanel {...filterProps} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Chart tabs */}
            <div className="flex gap-2 mb-4">
              {[{ key: 'monthly', label: 'Monthly Count' }, { key: 'overall', label: 'Overall Count' }].map(tab => (
                <button key={tab.key} onClick={() => setView(tab.key)}
                  className={`text-sm px-3 sm:px-4 py-1.5 rounded-lg border transition-colors ${
                    view === tab.key
                      ? 'bg-[#e85d04] text-white border-[#e85d04]'
                      : 'text-gray-500 border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Chart card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-6">
              {view === 'monthly' && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Workshops per month — {new Date().getFullYear()}</p>
                  <div className="overflow-x-auto">
                    <div className="flex items-end gap-1" style={{ height: '140px', minWidth: '340px' }}>
                      {monthlyData.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-0.5" style={{ height: '100%' }}>
                          <div className="flex-1 w-full flex items-end">
                            <div
                              className="w-full bg-[#e85d04] rounded-t hover:opacity-75 transition-opacity cursor-pointer"
                              style={{ height: `${(val / maxVal) * 100}%`, minHeight: '4px' }}
                              title={`${months[i]}: ${val}`}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 leading-none">{val}</span>
                          <span className="text-[10px] text-gray-400 leading-none">{months[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {view === 'overall' && (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <svg viewBox="0 0 200 200" className="w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0">
                    {pieSegments.map((seg, i) => (
                      <path key={i} d={seg.path} fill={seg.color} stroke="white" strokeWidth="2" />
                    ))}
                  </svg>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full">
                    {overallData.map((w, i) => (
                      <div key={w.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: pieColors[i] }} />
                        <div>
                          <p className="text-sm font-medium text-gray-800 leading-tight">{w.name}</p>
                          <p className="text-xs text-gray-400">{w.count} workshops</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Table header row */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-medium text-gray-800">Upcoming Workshops</h2>
              <span className="text-sm text-gray-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Table card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
              {/* Top page number buttons */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <span className="text-xs text-gray-400">Page {page} of {totalPages}</span>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-7 h-7 text-xs rounded-md font-medium transition-colors ${
                        page === p ? 'bg-[#0ea5e9] text-white' : 'text-gray-500 hover:bg-gray-100'
                      }`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontally scrollable table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: '580px' }}>
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide w-10">No.</th>
                      {['Coordinator', 'Institute', 'Instructor', 'Workshop', 'Date', 'Proposed By'].map(col => (
                        <th key={col} className="text-left px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visible.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                          No workshops match the current filters.
                        </td>
                      </tr>
                    ) : visible.map((w, idx) => (
                      <tr key={w.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-3 text-gray-400 text-xs">{(page - 1) * PER_PAGE + idx + 1}</td>
                        <td className="px-3 py-3 text-gray-800 whitespace-nowrap">{w.coordinator}</td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{w.institute}</td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{w.instructor}</td>
                        <td className="px-3 py-3 text-gray-800 font-medium whitespace-nowrap">{w.workshop}</td>
                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{w.date}</td>
                        <td className="px-3 py-3">
                          <span className={`text-xs px-2 py-1 rounded-md font-medium whitespace-nowrap ${
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

            {/* Bottom pagination */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  Previous
                </button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}