import type React from "react"

const ChatifyLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-3 h-3 bg-[#b9bbbe] rounded-full animate-bounce"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: "0.6s",
            }}
          />
        ))}
      </div>
      <p className="text-[#b9bbbe] text-sm">Loading...</p>
    </div>
  )
}

export default ChatifyLoader

