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

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Workshop Status</h1>
          <p className="text-sm text-gray-400 mt-1">Track accepted and proposed workshops</p>
        </div>

        <Section title="Workshops Accepted" color="green">
          <Table
            cols={['Coordinator', 'Institute', 'Workshop', 'Date', 'Status']}
            rows={accepted.map(w => [
              <a href={`/workshop/${w.id}`} className="text-[#e85d04] hover:underline">{w.coordinator}</a>,
              w.institute,
              w.workshop,
              w.date,
              <Badge type="green">{w.status}</Badge>,
            ])}
          />
        </Section>

        <Section title="Workshops Proposed" color="orange" className="mt-10">
          <Table
            cols={['Coordinator', 'Institute', 'Workshop', 'Date', 'Status', 'Action']}
            rows={proposed.map(w => [
              <a href={`/workshop/${w.id}`} className="text-[#e85d04] hover:underline">{w.coordinator}</a>,
              w.institute,
              w.workshop,
              w.date,
              <Badge type="yellow">{w.status}</Badge>,
              <button className="text-xs bg-[#e85d04] text-white px-3 py-1 rounded-lg hover:bg-[#c94d00] transition-colors">
                Accept
              </button>,
            ])}
          />
        </Section>

      </div>
    </div>
  )
}

function Section({ title, color, children }) {
  const colors = {
    green: 'text-green-600',
    orange: 'text-[#e85d04]',
  }
  return (
    <div className="mb-10">
      <h2 className={`text-base font-medium mb-3 ${colors[color]}`}>{title}</h2>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function Table({ cols, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {cols.map(col => (
              <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700">
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

function Badge({ type, children }) {
  const styles = {
    green: 'bg-green-50 text-green-700 border border-green-200',
    yellow: 'bg-orange-50 text-orange-700 border border-orange-200',
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-md font-medium ${styles[type]}`}>
      {children}
    </span>
  )
}