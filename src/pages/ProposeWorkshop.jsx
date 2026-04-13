import { useState } from 'react'

const workshopTypes = [
  { id: 1, name: 'Python' },
  { id: 2, name: 'Scilab' },
  { id: 3, name: 'eSim' },
  { id: 4, name: 'OpenFOAM' },
  { id: 5, name: 'DWSIM' },
  { id: 6, name: 'Osdag' },
]

const tnc = {
  1: 'You agree to conduct the Python workshop for a minimum of 2 days, ensure lab availability, and submit a report post workshop.',
  2: 'You agree to conduct the Scilab workshop for a minimum of 3 days and ensure all students have access to the software.',
  3: 'You agree to conduct the eSim workshop and ensure all participants have working installations before the event.',
  4: 'OpenFOAM workshops require a minimum of 4 days and a Linux lab environment.',
  5: 'DWSIM workshops require coordinator to attend a pre-workshop briefing session.',
  6: 'Osdag workshops require structural engineering background from the coordinator.',
}

export default function ProposeWorkshop() {
  const [form, setForm] = useState({ workshopType: '', date: '', tncAccepted: false })
  const [showTnc, setShowTnc] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.workshopType) return setError('Please select a workshop type.')
    if (!form.date) return setError('Please select a date.')
    if (!form.tncAccepted) return setError('Please accept the terms and conditions.')
    setError('')
    // TODO: hook to api
  }

  function openTnc(e) {
    e.preventDefault()
    if (!form.workshopType) return setError('Please select a workshop type first.')
    setError('')
    setShowTnc(true)
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-lg mx-auto">

        <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm text-orange-700">
          Before proposing, check the{' '}
          <a href="/types" className="font-medium underline">Workshop Types</a>{' '}
          section for details.
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h1 className="text-lg font-medium text-gray-900">Propose a Workshop</h1>
          </div>

          <div className="px-6 py-6">
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1.5">
                  Workshop Type
                </label>
                <select
                  value={form.workshopType}
                  onChange={e => setForm({ ...form, workshopType: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors"
                >
                  <option value="">Select a workshop type</option>
                  {workshopTypes.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div className="mb-6 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="tnc"
                  checked={form.tncAccepted}
                  onChange={e => setForm({ ...form, tncAccepted: e.target.checked })}
                  className="mt-0.5"
                />
                <label htmlFor="tnc" className="text-sm text-gray-600">
                  I accept the{' '}
                  <a href="#" onClick={openTnc} className="text-[#e85d04] underline">
                    terms and conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e85d04] text-white text-sm rounded-lg py-2.5 hover:bg-[#c94d00] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

      </div>

      {showTnc && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-900">Terms and Conditions</h2>
              <button onClick={() => setShowTnc(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
                &times;
              </button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {tnc[form.workshopType] || 'No terms available for this workshop type.'}
            </p>
            <button
              onClick={() => { setForm({ ...form, tncAccepted: true }); setShowTnc(false) }}
              className="mt-6 w-full bg-[#e85d04] text-white text-sm rounded-lg py-2 hover:bg-[#c94d00] transition-colors"
            >
              Accept & Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}