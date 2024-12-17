import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IUser } from "@/context/AuthContext"
import { getAge } from "@/lib/utils"
import { Link } from "react-router-dom"

export function UserCarousel({ users }: { users: IUser[] }) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {users.map((user) => (
          <CarouselItem key={user?._id}>
            <div className="p-1">
              <Link to={`/profile/${user?._id}`} className="block">
                <Card className="border-4 border-shade-500 mt-5">
                  <CardContent className="flex aspect-square items-center justify-center p-6 rounded-lg" style={{
                    backgroundImage: `url(${user?.profilePicture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}>
                  </CardContent>
                </Card>
              </Link>
              <div className="flex-center  flex-col text-normal p-4">
                <p className="text-lg font-bold">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm">{getAge(user?.dateOfBirth as string)} years old</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
