import { Badge } from "@/components/ui/badge";
import React from "react";

interface ReviewCardProps {
  name: string;
  content: string;
  hasVideo: boolean;
  emoji: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  content,
  hasVideo,
  emoji,
}) => {
  const em = emoji == "SAD" ? "🥲" : emoji == "HAPPY" ? "😀" : "😍";
  return (
    <article className="flex flex-col w-full max-md:ml-0 transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col grow px-7 pt-6 pb-14 w-full text-black bg-white rounded-2xl  shadow-sm border border-slate-100 max-md:px-5 max-md:mt-9 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-4 items-center">
            <h2 className="flex-auto self-stretch my-auto text-xl font-semibold">
              {name}
            </h2>
            {hasVideo && (
              <Badge
                variant="secondary"
                className="bg-green-300 px-3 py-1 hover:bg-green-400"
              >
                video
              </Badge>
            )}
          </div>
          <div className="my-auto text-3xl">{em}</div>
        </div>
        <p className="mt-3.5 text-base max-md:max-w-full">{content}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
