import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import socket from "@/utils/socket";
import clsx from "clsx";
import { IMessage } from "@/types";


const Message = () => {
  const location = useLocation();
  const [message, setMessage] = useState<IMessage>({ senderId: "", receiverId: "", text: "", timestamp: "", chatId: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const currentUserId = useAuth().user?._id;
  const selectedUserId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/message/${currentUserId}/${selectedUserId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages);
          console.log(data.messages);
          console.log
        }
        else {
          throw new Error("Failed to fetch messages");
        }
      }
      catch (error) {
        console.error(error);
        setError("Failed to fetch messages");
      }
      finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, [currentUserId, selectedUserId])

  useEffect(() => {
    socket.emit('userConnected', { userId: currentUserId });

    socket.on('receiveMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    }
  }, [currentUserId]);

  const sendMessage = () => {
    if (message.text?.trim()) {  // Check if text is not empty
      const newMessage = {
        senderId: currentUserId ? currentUserId : null,
        receiverId: selectedUserId,
        text: message.text,
        timestamp: new Date().toISOString(),
        chatId: [currentUserId, selectedUserId].sort().join('_')
      };

      socket.emit('message', newMessage);
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage({ senderId: "", receiverId: "", text: "", timestamp: "", chatId: "" });
    }
  }

  return (
    <main className="main">
      <div className="flex  bg-shade-500 flex-col max-w-[600px] w-full rounded-xl p-3">
        <div className="p-3 flex flex-col h-[500px] bg-shade-100 rounded-xl ">
          <div>
            {selectedUserId}
          </div>
          <div className="flex flex-col w-full  h-full overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                className={clsx(
                  "p-2 rounded-xl my-1",
                  {
                    "bg-romanticRed/20 ml-auto": msg.senderId === currentUserId,  // Align to the right
                    "bg-softWhite mr-auto": msg.senderId === msg.receiverId       // Align to the left
                  }
                )}
                key={index}
              >
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-between gap-3">
          <input value={message?.text as string}
            onChange={(e) => setMessage({
              ...message,
              text: e.target.value
            })}
            placeholder="Type a message..." type="text" className="input" onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
          <button onClick={sendMessage} className=" bg-romanticRed/20 text-softWhite border-softWhite border-2 p-2  px-6 rounded-xl">Send</button>
        </div>
      </div>
      {loading && <div>Loading messages...</div>}
      {error && <div className="error">{error}</div>}

    </main>
  )
}

export default Message