import { Message } from "@/app/model/message";
import { Role } from "@/app/model/role";

import Markdown from "react-markdown"; // Import ReactMarkdown
import remarkGfm from "remark-gfm"; // For GitHub-flavored Markdown (tables, strikethrough, etc.)
import rehypeHighlight from "rehype-highlight"; // For syntax highlighting in code blocks
import "highlight.js/styles/github.css"; // Import a syntax highlighting theme

export default function MessageItem({message}: {message: Message}) {
  return (
    <div className={`flex w-[calc(100%-2rem)] items-center m-3 gap-2 ${
        message.role === Role.User ? 'flex-row-reverse' : 'flex-row'
      }`}>
      
      {message.role === Role.User &&
      <span aria-label='avatar' className="border-1 border-slate-400 rounded-full p-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </span>
      }
      <div aria-label='message-content' 
        className={`markdown-content rounded-xl p-3 ${
          message.role === Role.Assistant ? 'w-full bg-stone-100' : 'bg-slate-200'
        }`}>
        
        <Markdown
          children={message.content}
          remarkPlugins={[remarkGfm]} // Enable GitHub-flavored Markdown
          rehypePlugins={[rehypeHighlight]} // Enable syntax highlighting
        />
      </div>
    </div>
  )
}