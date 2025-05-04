'use client';

import ControlBar from "@/app/components/control-bar/control-bar";
import ConversationContentPanel from "@/app/components/conversation-content/conversation-content-panel";
import ConversationListPanel from "@/app/components/conversation-list/conversation-list-panel";

export default function ChatBotPage() {

  return (
    <div className="flex flex-row w-full h-screen">
      <div id='control-bar' className="basis-5/100 border-r-1 border-stone-300 bg-stone-300">
        <ControlBar />
      </div>

      <div id='conversation-list' className="basis-20/100 border-r-1 border-stone-300 bg-stone-100">
        <ConversationListPanel />
      </div>
      
      <div id='conversation-content' className="basis-75/100">
        <ConversationContentPanel />
      </div>
    </div>
  );
}
