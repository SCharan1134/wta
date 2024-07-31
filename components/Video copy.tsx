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

const formSchema = z.object({
  video: z.instanceof(File, { message: "Upload a video first" }).nullable(),
});

const Video = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        if (videoElement.duration <= 65) {
          setVideoFile(file);
        } else {
          alert("Video duration exceeds 65 seconds.");
        }
      };
    }
  };

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({
      video: true,
      onStop: (blobUrl, blob) => {
        const videoElement = document.createElement("video");
        videoElement.src = blobUrl;
        videoElement.onloadedmetadata = () => {
          if (videoElement.duration <= 65) {
            setVideoFile(
              new File([blob], "recorded-video.mp4", { type: "video/mp4" })
            );
          } else {
            alert("Recorded video duration exceeds 65 seconds.");
          }
        };
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video: null,
    },
  });

  const handleFormSubmit = (values: any) => {
    if (videoFile) {
      onSubmit(videoFile);
    } else {
      alert("Please upload or record a video.");
    }
  };

  const videoRef = useCallback(
    (node: any) => {
      if (node) {
        node.srcObject = previewStream;
      }
    },
    [previewStream]
  );

  useEffect(() => {
    if (status === "recording") {
      setVideoFile(null); // Remove the uploaded video when recording starts
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  return (
    <section className="px-20 py-5">
      <h1 className="text-3xl mt-10">Upload or Record Video Review</h1>
      <div className="w-5/12 mt-5 px-5">
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
                  disabled={status === "recording"} // Disable input while recording
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
            <div className="mt-5">
              <Button
                onClick={startRecording}
                disabled={status === "recording"}
              >
                {status === "recording" ? "Recording..." : "Start Recording"}
              </Button>
              {status === "recording" && (
                <Button onClick={stopRecording} className="ml-4">
                  Stop Recording
                </Button>
              )}
              {status === "recording" && (
                <div className="mt-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full transform scale-x-[-1]"
                  />
                  <p className="mt-2 text-red-500">
                    Recording Time: {recordingTime} seconds
                  </p>
                </div>
              )}
              {mediaBlobUrl && (
                <video src={mediaBlobUrl} controls className="mt-4" />
              )}
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit">Submit Video</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Video;
