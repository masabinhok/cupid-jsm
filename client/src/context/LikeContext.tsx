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

  const toggleLike = (userId: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [userId]: !prevLikes[userId], // Toggle like/unlike
    }));
    localStorage.setItem('likes', JSON.stringify(likes));
  };
  return (
    <LikeContext.Provider value={{
      likes, toggleLike
    }}>
      {children}
    </LikeContext.Provider>
  )
}