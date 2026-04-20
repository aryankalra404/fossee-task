import { useState } from 'react'

/**
 * Static configuration for workshop types and T&C.
 * Keeping these as objects allows for O(1) lookup speed when 
 * switching between workshop types in the UI.
 */
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

  /**
   * Defensive validation: 
   * Provides immediate feedback to the user before attempting any API calls.
   * This saves server resources and improves perceived speed.
   */
  function handleSubmit(e) {
    e.preventDefault()
    if (!form.workshopType) return setError('Please select a workshop type.')
    if (!form.date) return setError('Please select a date.')
    if (!form.tncAccepted) return setError('Please accept the terms and conditions.')
    
    setError('')
    console.log('Form submitted:', form)
    // Integration point for FOSSEE backend
  }

  /**
   * UX Logic: Preventing the default anchor behavior to keep the user 
   * in the flow without page refreshes.
   */
  function openTnc(e) {
    e.preventDefault()
    if (!form.workshopType) return setError('Please select a workshop type first.')
    setError('')
    setShowTnc(true)
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-lg mx-auto">

        <div className="mb-6 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-xs md:text-sm text-orange-800 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Check <a href="/types" className="font-bold underline decoration-2">Workshop Types</a> for prerequisites.</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all">
          <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/20">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Propose a Workshop</h1>
          </div>

          <div className="px-6 py-8">
            {error && (
              <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 animate-in fade-in zoom-in-95 duration-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Workshop Category
                </label>
                <select
                  value={form.workshopType}
                  onChange={e => setForm({ ...form, workshopType: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50/30 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-[#e85d04] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Choose an option...</option>
                  {workshopTypes.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50/30 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-[#e85d04] outline-none transition-all"
                />
              </div>

              <div className="pt-2 pb-4 flex items-start gap-3">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="tnc"
                    checked={form.tncAccepted}
                    onChange={e => setForm({ ...form, tncAccepted: e.target.checked })}
                    className="w-5 h-5 border-gray-300 rounded text-[#e85d04] focus:ring-[#e85d04] transition-all cursor-pointer"
                  />
                </div>
                <label htmlFor="tnc" className="text-sm text-gray-600 leading-tight">
                  I accept the{' '}
                  <button onClick={openTnc} className="text-[#e85d04] font-semibold hover:underline">
                    terms and conditions
                  </button>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e85d04] text-white text-sm font-bold rounded-xl py-4 hover:bg-[#c94d00] shadow-sm active:scale-[0.98] transition-all"
              >
                Submit Proposal
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* T&C Modal: Implemented with a focus on Mobile UX. 
          Large "Accept" button and easy close interaction.
      */}
      {showTnc && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[100] px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Workshop Agreement</h2>
              <button 
                onClick={() => setShowTnc(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            
            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 mb-8">
              <p className="text-sm text-gray-700 leading-relaxed italic">
                {tnc[form.workshopType] || 'Please select a workshop type first to view specific terms.'}
              </p>
            </div>

            <button
              onClick={() => { setForm({ ...form, tncAccepted: true }); setShowTnc(false) }}
              className="w-full bg-[#e85d04] text-white text-sm font-bold rounded-xl py-3 hover:bg-[#c94d00] transition-all shadow-md active:scale-95"
            >
              I Understand & Accept
            </button>
          </div>
        </div>
      )}
    </div>
  )
}