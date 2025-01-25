import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom";
import { postReq } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/features/userSlice";

function SignIn() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state) => (state.user));
console.log(state)
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be atleast 8 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {

    const res = await postReq('/auth/login', values)
    console.log(res);

    const data = await res?.data?.user
    // console.log(data)
    dispatch(setUser(data))

    if(data){
      navigate('/')
    }
    
  }

  return (
    <div className="w-full h-screen  flex justify-center items-center ">
    <Card className="w-[410px]">
  <CardHeader >
    <Link to={'/'} className="text-center">
              <h1 className="text-xl font-semibold uppercase tracking-tighter font-serif">
               logo here
              </h1>
            </Link>
    <CardTitle className='text-2xl text-center'>Sign In</CardTitle>
    <CardDescription className='text-center'>Please Enter your email and password </CardDescription>
  </CardHeader>
  <CardContent>
  <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="please enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center">
          <Button  type="submit">Submit</Button>
          <div className="mt-2">
            Don't have account? <Link to={'/sign-up'} className="text-blue-500 hover:underline">Sign up</Link>
          </div>
          </div>
        </form>
      </Form>
  </CardContent>
  
</Card>

    </div>
  );
}

export default SignIn;
