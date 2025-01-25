import React from 'react'
import { Input } from './ui/input'
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
const formSchema = z.object({
  search: z.string()
})

function SearchBox() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })


  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.search)
  
  }

  
  
  
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => (
          <FormItem>
            <FormControl>
            <Input placeholder='search here...' className='rounded-full md:w-[500px] h-9' {...field}></Input>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  </Form>
    
  )
}

export default SearchBox