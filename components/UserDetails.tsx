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
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  number: z
    .string()
    .min(10, {
      message: "number must be 10 characters.",
    })
    .max(10, {
      message: "Username must be 10 characters.",
    }),
  state: z
    .string()
    .min(2, {
      message: "state must be at least 2 characters.",
    })
    .max(50, {
      message: "state must be at least 2 characters.",
    }),
  district: z
    .string()
    .min(2, {
      message: "district must be at least 2 characters.",
    })
    .max(50, {
      message: "district must be at least 2 characters.",
    }),
  pincode: z
    .string()
    .min(6, {
      message: "number must be 6 characters.",
    })
    .max(6, {
      message: "number must be 6 characters.",
    }),
});

const UserDetails = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      state: "",
      district: "",
      pincode: "",
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between w-full gap-5">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>district</FormLabel>
                    <FormControl>
                      <Input placeholder="district" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>state</FormLabel>
                    <FormControl>
                      <Input placeholder="state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="pincode" {...field} />
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

export default UserDetails;
