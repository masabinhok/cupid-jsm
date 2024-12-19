import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import socket from "@/utils/socket";
import clsx from "clsx";
import { IMessage, IUser } from "@/types";
import { defaultPic } from "@/assets";
import { ArrowLeft } from "lucide-react";
import ProfileNav from "@/components/ProfileNav";

const Message = () => {
  const location = useLocation();
  const [message, setMessage] = useState<IMessage>({ senderId: "", receiverId: "", text: "", timestamp: "", chatId: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const currentUserId = useAuth().user?._id;
  const selectedUserId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/profile/${selectedUserId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          throw new Error("Failed to fetch user");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user");
      }
    };
    fetchUser();
  }, [selectedUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/message/${currentUserId}/${selectedUserId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages);
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [currentUserId, selectedUserId]);

  useEffect(() => {
    socket.emit('userConnected', { userId: currentUserId });

    socket.on('receiveMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [currentUserId]);

  const sendMessage = () => {
    if (message.text?.trim()) {
      const newMessage = {
        senderId: currentUserId ? currentUserId : null,
        receiverId: selectedUserId,
        text: message.text,
        timestamp: new Date().toISOString(),
        chatId: [currentUserId, selectedUserId].sort().join('_')
      };

      socket.emit('message', newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage({ senderId: "", receiverId: "", text: "", timestamp: "", chatId: "" });
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  })

  const navigate = useNavigate();

  return (
    <main className="main">

      <div className="flex flex-col bg-shade-200 max-w-[600px] w-full rounded-xl p-3 text-romanticRed relative">
        <button onClick={() => navigate('/dashboard')} className="absolute -top-12 -left-0 bg-shade-100/50 rounded-full p-1 hover:text-normal tranimate">
          <ArrowLeft />
        </button>
        <div className="flex items-center gap-3 p-3">
          <Link className="flex items-center gap-3" to={`/profile/${selectedUserId}`}>
            <img src={user?.profilePicture || defaultPic} alt="profile" className="aspect-square w-12 h-12 rounded-full object-cover" />
            <div>
              {user?.firstName && <h1 className="text-xl leading-4 font-semibold">{user?.firstName} {user?.lastName}</h1>}
              <p className="text-sm text-romanticRed">{user?.email}</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col w-full h-[400px] overflow-y-auto p-3 bg-shade-100 rounded-xl shadow-md">
          {loading && <div className="flex justify-center items-center text-gray-500">Loading messages...</div>}
          {error && <div className="error text-red-600">{error}</div>}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={clsx(
                "p-3  rounded-sm shadow-sm shadow-shade-400 my-2 text-sm font-medium break-words ",
                {
                  "bg-shade-500 text-white ml-auto w-fit ": msg.senderId === currentUserId, // Sent message styling
                  "bg-softWhite text-black  mr-auto w-fit": msg.senderId !== currentUserId, // Received message styling
                }
              )}
            >
              <span>{msg.text}</span>
            </div>

          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input
            value={message?.text as string}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
            placeholder="Type a message..."
            type="text"
            className="input w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-romanticRed"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-romanticRed/20 text-softWhite border-softWhite border-2 p-2 px-6 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
      <ProfileNav />
    </main>
  );
};

export default Message;
