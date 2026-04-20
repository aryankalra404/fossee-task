import { useState } from 'react'

/**
 * Workshop Instance Data.
 * Using a flat object for the primary workshop data makes 
 * property access straightforward and readable.
 */
const workshop = {
  id: 1,
  type: 'Python',
  typeId: 1,
  date: 'May 10, 2026',
  coordinator: 'Ravi Kumar',
  instructor: 'Dr. Sharma',
  status: 'accepted',
}

/**
 * Initial Discussion Thread.
 * Note the 'public' boolean; this is a key feature for 
 * internal coordinator/instructor communication.
 */
const initialComments = [
  { id: 1, author: 'Dr. Sharma', date: 'Apr 20, 2026', text: 'Please ensure all students have Python 3.10+ installed before the workshop.', public: true },
  { id: 2, author: 'Ravi Kumar', date: 'Apr 22, 2026', text: 'Confirmed, will send instructions to participants a week before.', public: true },
  { id: 3, author: 'Dr. Mehta', date: 'Apr 23, 2026', text: 'Lab booking confirmed for both days.', public: false },
]

// Mocking role-based access for the UI demonstration
const isInstructor = true

export default function WorkshopDetails() {
  const [comments, setComments] = useState(initialComments)
  const [text, setText] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  /**
   * Optimistic UI Update:
   * We update the local state immediately to give the user instant 
   * feedback. In a production app, we would sync this with a 
   * POST request and handle potential rollback on failure.
   */
  function postComment(e) {
    e.preventDefault()
    if (!text.trim()) return
    
    const newComment = {
      id: comments.length + 1,
      author: 'Aryan Kalra', // Linked to user session
      date: 'now',
      text,
      public: isPublic,
    }

    setComments([...comments, newComment])
    setText('')
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Workshop Details
          </h1>
        </header>

        {/* Data Grid: 
            I've used a mapping approach here to ensure consistent 
            spacing and typography across all metadata rows.
        */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-10 shadow-sm">
          {[
            { label: 'Workshop Type', value: <a href={`/types/${workshop.typeId}`} className="text-[#e85d04] font-semibold hover:underline">{workshop.type}</a> },
            { label: 'Proposed Date', value: workshop.date },
            { label: 'Lead Coordinator', value: workshop.coordinator },
            {
              label: 'Current Status', value: (
                <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border ${
                  workshop.status === 'accepted'
                    ? 'bg-green-50 text-green-700 border-green-100'
                    : 'bg-orange-50 text-orange-700 border-orange-100'
                }`}>
                  {workshop.status}
                </span>
              )
            },
            ...(workshop.status === 'accepted' ? [{ label: 'Assigned Instructor', value: workshop.instructor }] : []),
          ].map((row, i, arr) => (
            <div key={i} className={`flex items-start md:items-center px-6 py-4 ${i !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <p className="w-32 md:w-40 text-[11px] font-bold text-gray-400 uppercase tracking-widest shrink-0 mt-0.5 md:mt-0">
                {row.label}
              </p>
              <p className="text-sm text-gray-800 font-medium">{row.value}</p>
            </div>
          ))}
        </div>

        {/* Interaction Section: Commenting System.
            Modern UI focus: Separating the input from the feed to 
            reduce visual clutter.
        */}
        <section className="mb-10">
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-gray-50/10">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Post a Update
                </h2>
                {isInstructor && (
                  <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={e => setIsPublic(e.target.checked)}
                      className="rounded border-gray-300 text-[#e85d04] focus:ring-[#e85d04]"
                    />
                    <span>PUBLIC COMMENT</span>
                  </label>
                )}
              </div>
            </div>
            
            <form onSubmit={postComment}>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={3}
                placeholder="Share an update or question with the team..."
                className="w-full px-6 py-4 text-sm text-gray-700 outline-none resize-none bg-transparent placeholder:text-gray-300 focus:bg-white transition-colors"
              />
              <div className="px-6 py-3 flex justify-end bg-white border-t border-gray-50">
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="bg-[#e85d04] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#c94d00] transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Discussion Feed:
            Using a vertical timeline pattern which is standard for 
            audit trails and project discussions.
        */}
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">Recent Discussion</h2>
        <div className="flex flex-col gap-4">
          {comments.slice().reverse().map(c => (
            <div key={c.id} className={`border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all ${!c.public ? 'border-dashed border-gray-300 bg-gray-50/50' : ''}`}>
              <div className="px-5 py-3 border-b border-gray-50 flex items-center gap-3">
                <span className="text-sm font-bold text-gray-800">{c.author}</span>
                {!c.public && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold bg-gray-200 text-gray-500 uppercase tracking-tighter">
                    Internal Only
                  </span>
                )}
                <span className="text-[10px] text-gray-400 font-medium ml-auto uppercase tracking-tighter">
                  {c.date}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}