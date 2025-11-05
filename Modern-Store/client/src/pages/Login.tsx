import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "../lib/zod/loginSchema";
import {zodResolver} from "@hookform/resolvers/zod"
export default function Login() {

  const BASE_URL = import.meta.env.VITE_BASE_URL
    const 
    {handleSubmit,
      register,
      setError,
      formState: {isSubmitting, errors}
    } = useForm<LoginSchemaType>({resolver: zodResolver(loginSchema)});

    const handleLogin = async (data: LoginSchemaType) => {
      const {email, password} = data;
      try{
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email, password})
        })

        const result = await res.json();

        if(!res.ok){
          setError("root", {message: "Invalid Credentials!"})
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user))
      }catch(err){ 
        if(err instanceof Error){
        setError("root", {message: err.message})// checking whether the caught value is a real Error object, not just some random value (like a string, number, or object).
      }else {
        setError("root", {message: "Failed to login!"})
      }
      }
    }
   
          return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm border border-gray-100"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>
       

        {errors.root && (
          <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-lg text-center">
            {errors.root?.message}
          </p>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-sm">Email</label>
          <input
            type="email"
            {...register("email")}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
           {errors.email && (
          <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-lg text-center">
            {errors.email.message}
          </p>
        )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-sm">Password</label>
          <input
          {...register("password")}
            type="password"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          {errors.password && (
          <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-lg text-center">
            {errors.password.message}
          </p>
        )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2.5 rounded-lg shadow-sm transition duration-150"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-orange-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}