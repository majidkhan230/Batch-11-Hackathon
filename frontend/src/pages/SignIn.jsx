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
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { postReq } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/features/userSlice";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import {auth,provider} from '../../fireabaseConfig.js'
function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const user = useSelector((state)=>state.user)
console.log(user)
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const res = await postReq('/auth/login', values);
      const data = res?.data?.user;
      
      if (data) {
        dispatch(setUser(data));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  const handleGoogleSignIn = async () => {

    const response = await signInWithPopup(auth, provider)
            const user = response.user
            const userData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                phoneNumber: user.phoneNumber
            }
            const apiResponse = await postReq('auth/google-login', userData)
            const data = apiResponse?.data?.user;
            console.log(apiResponse)

            if(apiResponse && apiResponse?.data){
              dispatch(setUser(data));
              navigate('/dashboard');

            }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <Card className="w-[410px] shadow-lg">
        <CardHeader>
          <Link to={'/'} className="text-center">
            <h1 className="text-xl font-semibold uppercase tracking-tighter font-serif mb-4">
              Your Logo
            </h1>
          </Link>
          <CardTitle className='text-2xl text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        {...field} 
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              
              </div>
            </form>
            <Button 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle  className="mr-2 h-4 w-4" />
                  Google
                </Button>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignIn;