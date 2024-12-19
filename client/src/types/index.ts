export interface IUser {
  _id: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  email: string;
  secret: string | null;
  otpGeneratedAt: Date | null;
  gender: string | null;
  dateOfBirth: string | null;
  profilePicture: string | null;
  bio: string | null;
  interests: string[] | null;
  location: {
    city: string | null;
    country: string | null;
    coordinates: {
      type: "Point";
      coordinates: [number, number] | null;
    } | null;
  };
  preference: {
    gender?: string | null;
    ageRange?: { min: number | null; max: number | null } | null;
    maxDistance?: number | null;
    interests?: string[] | null;
  } | null;
  socialLinks: string[] | null;
  matches: string[] | null;
  likesSent: string[] | null;
  likesReceived: string[] | null;
  messages: string[] | null;
  verified: boolean;
  lastActive: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  phone: string | null;
}

export interface IMessage {
  senderId: string | null;
  receiverId: string | null;
  text: string | null;
  timestamp: string | null;
  chatId: string  | null;
}