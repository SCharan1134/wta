"use client";
import Review from "@/components/Review";
import UserDetails from "@/components/UserDetails";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Video from "@/components/Video";

interface revDataInt {
  name: string;
  number: string;
  state: string;
  district: string;
  pincode: string;
  emoji: string;
  reviewText: string;
  hasVideo: Boolean;
  videoPath: string;
}
interface userDataInt {
  name: string;
  number: string;
  state: string;
  district: string;
  pincode: string;
}
interface reviewDataInt {
  emoji: string;
  review: string;
}

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [isUserSubmitted, setIsUserSubmitted] = useState(false);

  const [userData, setUserData] = useState<userDataInt>({
    name: " ",
    number: " ",
    state: " ",
    district: " ",
    pincode: " ",
  });
  const [reviewData, setReviewData] = useState<reviewDataInt>({
    emoji: "",
    review: "",
  });

  const handleReviewSubmit = async (data: any) => {
    setReviewData(data);

    setIsReviewSubmitted(true);
  };
  const handleUserSubmit = (data: any) => {
    setUserData(data);
    setIsUserSubmitted(true);
  };
  const handleVideoSubmit = async (data: any) => {
    const revData: revDataInt = {
      name: userData.name,
      number: userData.number,
      state: userData.state,
      district: userData.district,
      pincode: userData.pincode,
      emoji: reviewData.emoji,
      reviewText: reviewData.review,
      hasVideo: true,
      videoPath: data,
    };
    console.log(revData);

    try {
      setIsloading(true);
      const response = await axios.post("/api/addreview", revData);
      setUserData({
        name: " ",
        number: " ",
        state: " ",
        district: " ",
        pincode: " ",
      });
      setReviewData({
        emoji: "",
        review: "",
      });

      setIsloading(false);
      if (response) {
        toast({
          variant: "default",
          description: "Created Review Successfully",
        });
      }

      router.push("/");
    } catch (error) {
      console.log("an error occured", error);
    }
  };
  return (
    <section className="relative">
      {isloading ? (
        <div className="absolute top-0 right-0 w-full h-screen bg-white opacity-50 flex items-center justify-center">
          <p className="text-4xl">Loading</p>
        </div>
      ) : (
        <div>
          {isUserSubmitted ? (
            isReviewSubmitted ? (
              <Video onSubmit={handleVideoSubmit} />
            ) : (
              <Review onSubmit={handleReviewSubmit} />
            )
          ) : (
            <UserDetails onSubmit={handleUserSubmit} />
          )}
        </div>
      )}
    </section>
  );
};

export default page;
