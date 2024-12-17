import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IUser } from "@/types";
import { getAge } from "@/lib/utils";
import { Heart, HeartCrack } from "lucide-react";
import { defaultPic } from "@/assets";
import { Link } from "react-router-dom";
import { useLike } from "@/context/LikeContext";



export function UserCarousel({ users }: { users: IUser[] }) {
  const { toggleLike, likes } = useLike();
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {users.map((user) => (
          <CarouselItem key={user?._id}>
            <div className="p-1">
              <Card className="border-4 border-shade-500 mt-5">
                <CardContent className="flex flex-col aspect-square items-center justify-center rounded-lg relative">
                  {/* User Profile Picture */}
                  <Link to={`/profile/${user?._id}`} className="w-full h-full">
                    <img
                      src={user?.profilePicture || defaultPic}
                      alt={`${user?.firstName} ${user?.lastName}`}
                      className="w-full h-full rounded-lg object-cover border-4 border-t-0 border-shade-400 "
                    />
                  </Link>
                  {/* Like/Unlike Button */}
                  <button
                    className="absolute bottom-2 right-2 text-romanticRed"
                    onClick={() => toggleLike(user?._id)}
                  >
                    {likes[user?._id] ? <Heart fill="red" /> : <HeartCrack />}
                  </button>
                  <div className="flex-center rounded-xl w-full text-shade-500 flex-col p-4">
                    <p className="text-lg font-bold">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm">
                      {getAge(user?.dateOfBirth as string)} years old
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
