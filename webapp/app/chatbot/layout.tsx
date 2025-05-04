import {ConversationsProvider} from "@/app/context/AppContext";

export default function ChatBotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConversationsProvider>
            {children}
        </ConversationsProvider>
      </body>
    </html>
  );
}
