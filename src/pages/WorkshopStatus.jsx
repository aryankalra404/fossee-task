/**
 * Workshop status data models.
 * Keeping these separate allows for easy integration with an API 
 * while maintaining a clear view of the data structure.
 */
const accepted = [
  {
    id: 1,
    coordinator: 'Ravi Kumar',
    institute: 'IIT Bombay',
    workshop: 'Python',
    date: '2026-05-10',
    status: 'Accepted',
  },
  {
    id: 2,
    coordinator: 'Priya Sharma',
    institute: 'NIT Trichy',
    workshop: 'Scilab',
    date: '2026-06-15',
    status: 'Accepted',
  },
]

const proposed = [
  {
    id: 3,
    coordinator: 'Anil Mehta',
    institute: 'BITS Pilani',
    workshop: 'eSim',
    date: '2026-07-01',
    status: 'Pending',
  },
  {
    id: 4,
    coordinator: 'Sneha Patil',
    institute: 'VIT Vellore',
    workshop: 'OpenFOAM',
    date: '2026-07-20',
    status: 'Pending',
  },
]

export default function WorkshopStatus() {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Page Header: Simple, clear typography to set the context */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Workshop Status</h1>
          <p className="text-sm text-gray-500 mt-1 italic">Track and manage the progress of workshop requests.</p>
        </div>

        {/* Using a Section abstraction to keep the UI consistent. 
          The 'color' prop allows us to visually distinguish between 
          finalized and pending states at a glance.
        */}
        <Section title="Workshops Accepted" color="green">
          <Table
            cols={['Coordinator', 'Institute', 'Workshop', 'Date', 'Status']}
            rows={accepted.map(w => [
              <a href={`/workshop/${w.id}`} className="text-[#e85d04] font-medium hover:underline">{w.coordinator}</a>,
              w.institute,
              w.workshop,
              w.date,
              <Badge type="green">{w.status}</Badge>,
            ])}
          />
        </Section>

        <Section title="Workshops Proposed" color="orange" className="mt-12">
          <Table
            cols={['Coordinator', 'Institute', 'Workshop', 'Date', 'Status', 'Action']}
            rows={proposed.map(w => [
              <a href={`/workshop/${w.id}`} className="text-[#e85d04] font-medium hover:underline">{w.coordinator}</a>,
              w.institute,
              w.workshop,
              w.date,
              <Badge type="yellow">{w.status}</Badge>,
              /* CTA for quick administrative action */
              <button className="text-[11px] font-bold uppercase tracking-wider bg-[#e85d04] text-white px-4 py-1.5 rounded-lg hover:bg-[#c94d00] transition-all shadow-sm active:scale-95">
                Accept
              </button>,
            ])}
          />
        </Section>

      </div>
    </div>
  )
}

/**
 * Section Component: 
 * Encapsulates the visual hierarchy logic for each table group.
 */
function Section({ title, color, children }) {
  const colors = {
    green: 'text-green-700',
    orange: 'text-[#e85d04]',
  }
  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className={`text-sm font-bold uppercase tracking-widest mb-4 ${colors[color]}`}>
        {title}
      </h2>
      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  )
}

/**
 * Table Component: 
 * Optimized for responsiveness using 'overflow-x-auto'. 
 * This ensures the table doesn't break the layout on mobile.
 */
function Table({ cols, rows }) {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            {cols.map(col => (
              <th key={col} className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 text-gray-700 font-medium group-hover:text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Badge Component: 
 * Standardized status indicators to maintain UI consistency.
 */
function Badge({ type, children }) {
  const styles = {
    green: 'bg-green-50 text-green-700 border-green-100',
    yellow: 'bg-orange-50 text-orange-700 border-orange-100',
  }
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter border ${styles[type]}`}>
      {children}
    </span>
  )
}