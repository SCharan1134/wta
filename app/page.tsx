import ReviewCard from "@/components/ReviewCard";
import ReviewStats from "@/components/ReviewStats";
import prisma from "@/lib/prisma";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const getReviews = async () => {
  const reviews = await prisma.review.findMany();
  return reviews;
};

const Page = async () => {
  const reviews = await getReviews();
  // const [reviews, setReviews] = useState<any[]>([]);

  return (
    <main className="flex justify-center items-center px-16 pb-5  bg-white max-md:px-5">
      <div className="flex flex-col mt-3 w-full max-w-[1119px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <h1 className="text-3xl font-bold text-black max-md:max-w-full">
              Reviews
            </h1>
            <ReviewStats />
          </div>
        </div>
        <section className="mt-4 max-md:mt-10 max-md:max-w-full">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {reviews.map((review, index) => (
              <Popover key={index}>
                <HoverCard>
                  <PopoverTrigger>
                    <HoverCardTrigger>
                      <ReviewCard content={review.reviewText} {...review} />
                    </HoverCardTrigger>
                  </PopoverTrigger>
                  <HoverCardContent align="center" side="top">
                    <div>
                      <p>
                        <span className="font-bold">Name: </span>
                        {review.name}
                      </p>
                      <p>
                        <span className="font-bold">Number: </span>
                        {review.number}
                      </p>
                      <p>
                        <span className="font-bold">State: </span>
                        {review.state}
                      </p>
                      <p>
                        <span className="font-bold">District: </span>
                        {review.district}
                      </p>
                      <p>
                        <span className="font-bold">Pincode: </span>
                        {review.pincode}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <PopoverContent align="center" side="left">
                  <video width={500} height={1000} controls>
                    <source src={review.videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
