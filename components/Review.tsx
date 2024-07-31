"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  emoji: z.enum(["SAD", "HAPPY", "EXCITED"], {
    errorMap: () => ({ message: "Select an emoji" }),
  }),
  review: z.string().min(1, {
    message: "Review cannot be empty.",
  }),
});

const Review = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: "SAD",
      review: "",
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    onSubmit(values);
  }
  return (
    <section className="px-20 py-5">
      <h1 className="text-3xl mt-10">User Details</h1>
      <div className="w-5/12 mt-5 px-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emoji</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    >
                      <option value="SAD">🥲</option>
                      <option value="HAPPY">😀</option>
                      <option value="EXCITED">😍</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Input placeholder="Write your review" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Review;
