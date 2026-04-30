import { useState } from 'react'

/**
 * Static Data Mockup.
 * In a real-world scenario, this would be retrieved from a REST API. 
 * I've structured it to include 'by' (Proposed By) to allow for 
 * role-based filtering (Coordinator vs Instructor).
 */
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

/**
 * FilterPanel: Abstracted to keep the main statistics view decluttered.
 * It handles the complex UI for date picking, category filtering, and sorting.
 */
function FilterPanel({ fromDate, setFromDate, toDate, setToDate, workshopFilter, setWorkshopFilter,
  stateFilter, setStateFilter, sortOrder, setSortOrder, myWorkshopsOnly, setMyWorkshopsOnly,
  clearFilters, handleDownload, setPage }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-[10px] font-bold px-3 py-1.5 border border-[#e85d04] text-[#e85d04] rounded-lg hover:bg-orange-50 transition-all uppercase tracking-tighter"
        >
          Reset All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5">
        {/* Date Filters: Essential for chronological reporting */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">From</label>
            <input type="date" value={fromDate}
              onChange={e => { setFromDate(e.target.value); setPage(1) }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-orange-100 focus:border-[#e85d04] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">To</label>
            <input type="date" value={toDate}
              onChange={e => { setToDate(e.target.value); setPage(1) }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-orange-100 focus:border-[#e85d04] outline-none" />
          </div>
        </div>

        {/* Category Filters */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Technology</label>
          <select value={workshopFilter} onChange={e => { setWorkshopFilter(e.target.value); setPage(1) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-[#e85d04] outline-none appearance-none bg-gray-50/30">
            {workshopTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Region</label>
          <select value={stateFilter} onChange={e => { setStateFilter(e.target.value); setPage(1) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-[#e85d04] outline-none appearance-none bg-gray-50/30">
            {states.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* UI refinement: Toggle for personal workshops */}
        <div className="flex items-center gap-3 py-2">
          <input type="checkbox" id="myOnly" checked={myWorkshopsOnly}
            onChange={e => { setMyWorkshopsOnly(e.target.checked); setPage(1) }}
            className="w-4 h-4 rounded border-gray-300 text-[#e85d04] focus:ring-[#e85d04] cursor-pointer" />
          <label htmlFor="myOnly" className="text-sm font-medium text-gray-600 cursor-pointer">My workshops only</label>
        </div>

        {/* Action Buttons: Primary View and Export */}
        <div className="flex flex-col gap-2 pt-2">
          <button onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-bold py-3 rounded-xl transition-all active:scale-[0.98]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export as CSV
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

  /**
   * Data Processing: Client-side filtering logic.
   * This ensures the UI is snappy and reactive to filter changes without
   * needing a network round-trip for every small toggle.
   */
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

  /**
   * Custom Pie Chart Calculation:
   * I'm calculating the SVG paths manually to avoid the bundle bloat
   * of an external charting library. This improves performance on 
   * mobile devices with limited bandwidth.
   */
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

  /**
   * CSV Export Logic: 
   * A practical utility for FOSSEE coordinators to pull data into 
   * Excel/Google Sheets for reporting.
   */
  const handleDownload = () => {
    const csv = [
      ['Sr No.', 'Coordinator', 'Institute', 'Instructor', 'Workshop', 'Date', 'Proposed By'],
      ...filtered.map((w, i) => [i + 1, w.coordinator, w.institute, w.instructor, w.workshop, w.date, w.by])
    ].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'fossee_workshops.csv'; a.click()
    URL.revokeObjectURL(url)
  }

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
    handleDownload
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Workshop Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Cross-institutional monitoring and reporting</p>
          </div>
          
          {/* Mobile Filter Toggle: Improves space-efficiency on narrow screens */}
          <button
            onClick={() => setDrawerOpen(o => !o)}
            className="md:hidden flex items-center gap-2 text-xs font-bold px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-gray-600 shadow-sm active:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            FILTERS
          </button>
        </div>

        {/* Mobile Filter View */}
        {drawerOpen && (
          <div className="md:hidden mb-8 animate-in slide-in-from-top-4 duration-300">
            <FilterPanel {...filterProps} />
          </div>
        )}

        <div className="flex gap-8 items-start">

          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-72 flex-shrink-0 sticky top-24">
            <FilterPanel {...filterProps} />
          </div>

          <div className="flex-1 min-w-0">

            {/* Visualization Selector */}
            <div className="flex gap-2 mb-5">
              {[{ key: 'monthly', label: 'Monthly Trends' }, { key: 'overall', label: 'Tech Distribution' }].map(tab => (
                <button key={tab.key} onClick={() => setView(tab.key)}
                  className={`text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl border transition-all ${
                    view === tab.key
                      ? 'bg-[#e85d04] text-white border-[#e85d04] shadow-md'
                      : 'text-gray-400 border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Chart Area */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
              {view === 'monthly' && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Workshops Per Month ({new Date().getFullYear()})</p>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex items-end gap-1.5 sm:gap-2" style={{ height: '160px', minWidth: '400px' }}>
                      {monthlyData.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group" style={{ height: '100%' }}>
                          <div className="flex-1 w-full flex items-end">
                            <div
                              className="w-full bg-[#e85d04]/10 border-b-2 border-[#e85d04] rounded-t-md group-hover:bg-[#e85d04] transition-all cursor-pointer relative"
                              style={{ height: `${(val / maxVal) * 100}%`, minHeight: '4px' }}
                            >
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {val}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">{months[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {view === 'overall' && (
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="relative">
                    <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-sm">
                      {pieSegments.map((seg, i) => (
                        <path key={i} d={seg.path} fill={seg.color} stroke="white" strokeWidth="2" className="hover:opacity-80 transition-opacity cursor-help" />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center bg-white/80 backdrop-blur-sm p-2 rounded-full">
                        <p className="text-xs font-bold text-gray-900 leading-none">{totalOverall}</p>
                        <p className="text-[8px] text-gray-400 font-bold uppercase">Total</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-4 w-full lg:w-auto">
                    {overallData.map((w, i) => (
                      <div key={w.name} className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ backgroundColor: pieColors[i] }} />
                        <div>
                          <p className="text-xs font-bold text-gray-800 leading-tight">{w.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{w.count} sessions</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* List Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Upcoming Schedule</h2>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                {filtered.length} WORKSHOPS FOUND
              </span>
            </div>

            {/* Paginated Table Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ minWidth: '700px' }}>
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-16">ID</th>
                      <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Coordinator & Institute</th>
                      <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Instructor</th>
                      <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Tech</th>
                      <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-5 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {visible.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm italic">
                          No workshops match the selected criteria.
                        </td>
                      </tr>
                    ) : visible.map((w, idx) => (
                      <tr key={w.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-5 text-xs text-gray-300 font-mono">#{(page - 1) * PER_PAGE + idx + 1}</td>
                        <td className="px-5 py-5">
                          <p className="text-sm font-bold text-gray-800">{w.coordinator}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{w.institute}</p>
                        </td>
                        <td className="px-5 py-5 text-sm text-gray-600 font-medium">{w.instructor}</td>
                        <td className="px-5 py-5 text-center">
                          <span className="text-[11px] font-bold text-[#e85d04] bg-orange-50 px-2 py-1 rounded">
                            {w.workshop}
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm text-gray-500 font-mono">{w.date}</td>
                        <td className="px-5 py-5 text-right">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                            w.by === 'Coordinator'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {w.by}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination UI: Integrated into the bottom of the table card */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50/30 border-t border-gray-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Showing Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))} 
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 disabled:opacity-40 transition-all active:scale-90"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-8 h-8 text-[10px] font-bold rounded-lg transition-all ${
                          page === p ? 'bg-[#0ea5e9] text-white shadow-sm' : 'text-gray-400 hover:bg-gray-100'
                        }`}>
                        {p}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 disabled:opacity-40 transition-all active:scale-90"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}