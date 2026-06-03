import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../utils/api'
import { signUpSchema } from '../../schema/auth.schema'
import { toast } from 'sonner'



const SignUp = () => {
   const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signUpSchema) })

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', data)
     if(res.data) {
      toast.success("Account created succfully")
      navigate("/Login")
     }
    } catch (error) {
      console.error(error.response?.data || error.message) 
    }
  }
 
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-300 to-gray-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              {...register('name')}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="text"
              {...register('email')}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-700 transition duration-300"
          >
            {isSubmitting ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            <Link to="/Login"> Login</Link>
          </span>
        </p>
      </div>
    </section>
  )
}

export default SignUp
