import { useState } from 'react'

const workshop = {
  id: 1,
  type: 'Python',
  typeId: 1,
  date: 'May 10, 2026',
  coordinator: 'Ravi Kumar',
  instructor: 'Dr. Sharma',
  status: 'accepted',
}

const initialComments = [
  { id: 1, author: 'Dr. Sharma', date: 'Apr 20, 2026', text: 'Please ensure all students have Python 3.10+ installed before the workshop.', public: true },
  { id: 2, author: 'Ravi Kumar', date: 'Apr 22, 2026', text: 'Confirmed, will send instructions to participants a week before.', public: true },
  { id: 3, author: 'Dr. Mehta', date: 'Apr 23, 2026', text: 'Lab booking confirmed for both days.', public: false },
]

const isInstructor = true

export default function WorkshopDetails() {
  const [comments, setComments] = useState(initialComments)
  const [text, setText] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  function postComment(e) {
    e.preventDefault()
    if (!text.trim()) return
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        author: 'Aryan Kalra',
        date: 'now',
        text,
        public: isPublic,
      },
    ])
    setText('')
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900">Workshop Details</h1>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
          {[
            { label: 'Workshop Type', value: <a href={`/types/${workshop.typeId}`} className="text-[#e85d04] hover:underline">{workshop.type}</a> },
            { label: 'Date', value: workshop.date },
            { label: 'Coordinator', value: workshop.coordinator },
            {
              label: 'Status', value: (
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                  workshop.status === 'accepted'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-orange-50 text-orange-700 border border-orange-200'
                }`}>
                  {workshop.status}
                </span>
              )
            },
            ...(workshop.status === 'accepted' ? [{ label: 'Instructor', value: workshop.instructor }] : []),
          ].map((row, i, arr) => (
            <div key={i} className={`flex items-center px-6 py-3 ${i !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <p className="w-36 text-sm text-gray-500 shrink-0">{row.label}</p>
              <p className="text-sm text-gray-800">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Post a comment</h2>
              {isInstructor && (
                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={e => setIsPublic(e.target.checked)}
                    className="rounded"
                  />
                  Public
                  <span className="text-gray-400">(unchecked = instructors only)</span>
                </label>
              )}
            </div>
          </div>
          <form onSubmit={postComment}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={3}
              placeholder="Write a comment..."
              className="w-full px-6 py-4 text-sm text-gray-700 outline-none resize-none border-b border-gray-100"
            />
            <div className="px-6 py-3 flex justify-end">
              <button
                type="submit"
                className="bg-[#e85d04] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c94d00] transition-colors"
              >
                Post
              </button>
            </div>
          </form>
        </div>

        <h2 className="text-sm font-medium text-gray-700 mb-4">Comments</h2>
        <div className="flex flex-col gap-3">
          {comments.map(c => (
            <div key={c.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800">{c.author}</span>
                {!c.public && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 border border-gray-200">hidden</span>
                )}
                <span className="text-xs text-gray-400 ml-auto">{c.date}</span>
              </div>
              <div className="px-5 py-3">
                <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}