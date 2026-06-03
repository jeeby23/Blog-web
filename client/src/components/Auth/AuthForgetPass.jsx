import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowBigRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { forgetPasswordSchema } from '../../schema/auth.schema'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import api from '../../utils/api'
export default function ForgetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({resolver:zodResolver (forgetPasswordSchema)})

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/forgot-password",data)
      if (res.data){
         toast.success("Reset link has been sent to your email")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-300 to-gray-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forget Password</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="text"
              {...register("email")}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email &&(
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-700 transition duration-300"
          >
            { isSubmitting ? "Sending" : "Reset"}
          </button>
        </form>

        <span className="text-gray-600 cursor-pointer hover:underline py-3 text-center ">
          <Link to="/" className="flex items-center gap-2 py-2">
            Back Home
            <ArrowBigRight size={20} />
          </Link>
        </span>
      </div>
    </section>
  )
}
