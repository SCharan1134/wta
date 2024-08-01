"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  video: z.string(),
});

const Video = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [isloading, setIsloading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        if (videoElement.duration <= 65) {
          setVideoFile(file);
        } else {
          toast({
            variant: "destructive",
            description: "Video duration exceeds 65 seconds.",
          });
        }
      };
    }
  };

  const uploadImage = async (e: any) => {
    try {
      setIsloading(true);
      const image = new FormData();
      const cloudName = "duxz0nau4";
      image.append("file", e);
      image.append("cloud_name", "duxz0nau4");
      image.append("upload_preset", "wta-review");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        image
      );
      setIsloading(false);
      return response.data.url;
    } catch (error) {
      console.log("imageUploaderror", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video: "",
    },
  });

  const handleFormSubmit = async (values: any) => {
    if (videoFile) {
      const url = await uploadImage(videoFile);
      onSubmit(url);
    } else {
      toast({
        variant: "destructive",
        description: "Please upload or record a video.",
      });
    }
  };

  return (
    <section className="sm:px-20 px-5 py-5 relative">
      {isloading ? (
        <div className="absolute top-0 right-0 w-full h-screen bg-white opacity-50 flex items-center justify-center">
          <p className="text-4xl">Loading</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl mt-10">Upload</h1>
          <div className="sm:w-5/12 w-full mt-5 sm:px-5 px-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-8"
              >
                <FormItem>
                  <FormLabel>Upload Video</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      disabled={isloading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {videoFile && (
                  <div>
                    <p>{videoFile.name}</p>
                    <video
                      src={URL.createObjectURL(videoFile)}
                      controls
                      className="mt-4"
                    />
                  </div>
                )}
                <div className="w-full flex justify-end">
                  <Button type="submit">Submit Video</Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </section>
  );
};

export default Video;
