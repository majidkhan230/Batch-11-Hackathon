"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { postReq } from "@/api"

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    CNIC: z.string().length(13, {
      message: "CNIC must be exactly 13 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });
export function InputForm() {
  // ...
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
    postReq('/auth/register',values)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div>
            <FormField
              control={form.control}
              name="CNIC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNIC</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
            
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EMAIl</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
            
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
            
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="mt-2 text-center" >
        <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}



export default InputForm