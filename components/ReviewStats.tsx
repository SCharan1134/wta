import React from "react";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/prisma";

const getReviewStats = async () => {
  const totalReviews = await prisma.review.count();
  const sadReviews = await prisma.review.count({
    where: { emoji: "SAD" },
  });
  const happyReviews = await prisma.review.count({
    where: { emoji: "HAPPY" },
  });
  const excitedReviews = await prisma.review.count({
    where: { emoji: "EXCITED" },
  });

  return {
    totalReviews,
    sadReviews,
    happyReviews,
    excitedReviews,
  };
};

const ReviewStats: React.FC = async () => {
  const { totalReviews, sadReviews, happyReviews, excitedReviews } =
    await getReviewStats();
  return (
    <div className="flex flex-col items-end pl-12 mt-5 max-md:pl-5 max-md:mt-5 max-md:max-w-full gap-3">
      <div className="flex items-center">
        <p className="text-2xl">🥲</p>
        <Progress
          value={(sadReviews / totalReviews) * 100}
          className="lg:w-[300px] w-[300px] h-3"
        />
      </div>
      <div className="flex items-center">
        <p className="text-2xl">😀</p>
        <Progress
          value={(happyReviews / totalReviews) * 100}
          className="lg:w-[300px] w-[300px] h-3"
        />
      </div>
      <div className="flex  items-center">
        <p className="text-2xl">😍</p>
        <Progress
          value={(excitedReviews / totalReviews) * 100}
          className="lg:w-[300px] w-[300px] h-3"
        />
      </div>
      <p className="self-start mt-2 text-xl font-medium text-black max-md:max-w-full">
        Total {totalReviews} reviews
      </p>
    </div>
  );
};

export default ReviewStats;
