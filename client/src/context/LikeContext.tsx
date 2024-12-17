import { createContext, useContext, useEffect, useState } from "react";


interface LikeContextType {
  likes: UserLikes;
  toggleLike: (userId: string) => void;
}

interface UserLikes {
  [userId: string]: boolean;
}


//create a context
export const LikeContext = createContext<LikeContextType | null>(null);

interface LikeProviderProps {
  children: React.ReactNode;
}


//create a hook to use the context
export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
}


//create a context provider
export const LikeProvider = ({ children }: LikeProviderProps) => {
  const [likes, setLikes] = useState<UserLikes>(() => {
    const savedLikes = localStorage.getItem('likes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const toggleLike = async (userId: string) => {
    try {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [userId]: !prevLikes[userId], // Toggle like/unlike
      }));
      localStorage.setItem('likes', JSON.stringify(likes));
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/like/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Server not responding");
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <LikeContext.Provider value={{
      likes, toggleLike
    }}>
      {children}
    </LikeContext.Provider>
  )
}