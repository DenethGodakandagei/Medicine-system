'use client'

import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

// Define the shape of a message
interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIChatBotProps {
  // Keeping the tip prop for completeness, though unused in the example logic
  tip?: {
    _id: string
    title: string
    description: string
  }
}

const AIChatBot: React.FC<AIChatBotProps> = ({ tip }) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the bottom when new messages arrive or loading state changes
  useEffect(() => {
    if (scrollRef.current) {
      // Use requestAnimationFrame for smoother scrolling, especially after state updates
      requestAnimationFrame(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      })
    }
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      // Note: This API endpoint is hardcoded for demonstration and requires a running server
      const res = await axios.post('http://localhost:4000/api/askAI', {
        message: input,
      })

      const aiReply = res.data.reply || 'Sorry, no response from AI.'
      const aiMessage: Message = { role: 'assistant', content: aiReply }
      
      setMessages([...newMessages, aiMessage])
    } catch (error) {
      console.error('AI Chat Error:', error)
      const errorMessage: Message = { role: 'assistant', content: 'Error connecting to AI server. Please try again.' }
      setMessages([...newMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  // --- Format raw AI text into beautiful JSX ---
  const formatMessage = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let inList = false

    lines.forEach((line, idx) => {
      line = line.trim()
      if (!line) {
        if (inList) {
          // Close list if it's an empty line within a list context
          inList = false
          elements.push(<ul key={`ul-end-${idx}`}></ul>) // Placeholder for list closing
        }
        elements.push(<br key={idx} />)
        return
      }

      // Check for headings first
      if (line.startsWith('### ')) {
        inList = false
        // UPDATED COLOR: text-blue-700
        elements.push(<h4 key={idx} className="font-semibold text-base text-blue-700 mt-2">{line.replace('### ', '')}</h4>)
        return
      }
      if (line.startsWith('## ')) {
        inList = false
        // UPDATED COLOR & BORDER: text-indigo-800, border-blue-200
        elements.push(<h3 key={idx} className="font-bold text-lg text-indigo-800 mt-3 border-b pb-1 border-blue-200">{line.replace('## ', '')}</h3>)
        return
      }
      if (line.startsWith('# ')) {
        inList = false
        // UPDATED COLOR: text-indigo-900
        elements.push(<h2 key={idx} className="font-extrabold text-xl text-indigo-900 mt-4">{line.replace('# ', '')}</h2>)
        return
      }

      // Handle lists (both numbered and bullet)
      if (line.startsWith('- ') || /^\d+\.\s/.test(line)) {
        if (!inList) {
          inList = true
          // Start a new list element
          elements.push(<ul key={`ul-start-${idx}`} className="mt-1 space-y-1 list-inside"></ul>)
        }
        const isNumbered = /^\d+\.\s/.test(line)
        const content = isNumbered ? line.replace(/^\d+\.\s/, '') : line.replace('- ', '')
        elements.push(
          <li key={idx} className={`ml-4 text-sm ${isNumbered ? 'list-decimal' : 'list-disc'}`}>
            {content.split(/(\*\*.+?\*\*)/).map((part, i) => part.startsWith('**') ? <strong key={i} className="font-bold">{part.replace(/\*\*/g, '')}</strong> : part)}
          </li>
        )
        return
      }
      
      // If the last element was a list item but the current line is not, close the list
      if (inList) {
          inList = false
          elements.push(<ul key={`ul-end-${idx}`}></ul>) // Placeholder for list closing
      }

      // Handle paragraphs with bold text
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.+?\*\*)/)
        elements.push(
          <p key={idx} className="mt-1 text-sm leading-relaxed">
            {parts.map((part, i) => part.startsWith('**') ? <strong key={i} className="font-bold">{part.replace(/\*\*/g, '')}</strong> : part)}
          </p>
        )
        return
      }

      // Default paragraph
      elements.push(<p key={idx} className="mt-1 text-sm leading-relaxed">{line}</p>)
    })
    
    // Ensure list is closed if we ended on a list item
    if (inList) {
        elements.push(<ul key={`ul-end-final`}></ul>)
    }

    return elements
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        // UPDATED GRADIENT AND SHADOW to Blue/Indigo
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-2xl shadow-blue-400/50 hover:scale-[1.03] transform transition-all duration-300 ease-in-out flex items-center gap-2 font-semibold text-lg"
      >
        <span className="text-2xl">💡</span> Ask AI Assistant
      </button>

      {/* Right Side Toggle Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm md:max-w-md bg-gray-50 backdrop-blur-sm shadow-2xl transform transition-all duration-500 ease-in-out z-[55]
        ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-blue-100 bg-white shadow-lg z-10">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🧠</div>
            <h2 className="text-2xl font-extrabold text-gray-800">Mindful AI Chat</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-red-500 text-3xl font-light p-1 rounded-full transition-colors"
            aria-label="Close Chat"
          >
            &times;
          </button>
        </div>

        {/* Chat Messages Container */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-white"
        >
          {messages.length === 0 && (
            <div className="text-center p-10 mt-10 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xl text-blue-700 font-semibold mb-2">Welcome! 👋</p>
              <p className="text-gray-600 text-sm">
                I'm here to share knowledge on health, wellness, and mental well-being. Ask me anything!
              </p>
              {/* Optional starter prompts */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Tips for better sleep', 'What is anxiety?', 'Healthy breakfast ideas'].map((q) => (
                    <button 
                        key={q}
                        onClick={() => setInput(q)}
                        // Consistent blue shades
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    >
                        {q}
                    </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                // Assistant Avatar - UPDATED COLOR: bg-blue-600
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold mr-2 flex-shrink-0 shadow-lg">
                  <span aria-label="Robot icon">🧠</span>
                </div>
              )}
              {/* Message Bubble */}
              <div
                className={`max-w-[85%] px-4 py-3 rounded-3xl break-words shadow-lg transition-all duration-300 animate-fadeIn ${
                  msg.role === 'user'
                    // UPDATED GRADIENT: from-blue-600 to-indigo-700
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-tl-md border border-gray-100 shadow-xl'
                }`}
              >
                {formatMessage(msg.content)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
                {/* UPDATED COLOR: bg-blue-600 */}
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-lg mr-2 flex-shrink-0">
                    <span aria-label="Robot icon">🧠</span>
                </div>
                <div className="max-w-[70%] px-4 py-3 rounded-3xl bg-white text-gray-500 rounded-tl-md border border-gray-100 shadow-xl">
                    <span className="animate-pulse">Typing...</span>
                </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white shadow-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question about well-being..."
              // UPDATED FOCUS RING: focus:ring-blue-100 focus:border-blue-400
              className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-shadow shadow-inner text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
              aria-label="Chat input field"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              // UPDATED GRADIENT: from-blue-600 to-indigo-600
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Send Message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 14M12 12h-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles for better UX */}
      <style jsx global>{`
        /* Custom scrollbar for a cleaner look */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #93c5fd; /* Tailwind blue-300 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #eff6ff; /* Tailwind blue-50 */
        }
      `}</style>
      <style jsx>{`
        /* Animation for message bubbles */
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

export default AIChatBot