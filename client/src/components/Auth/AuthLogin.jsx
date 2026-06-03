import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../schema/auth.schema'
import api from '../../utils/api'
import { toast } from 'sonner'
import { useAuthStore } from '../../store/auth'

const AuthLogin = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data, { withCredentials: true })

      setUser(res.data.user)
      setToken(res.data.token)
      if (res.data) {
        toast.success('Login successfully')
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-300 to-gray-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-700 transition duration-300"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <div>
            <span className="text-blue-500 cursor-pointer hover:underline text-[14px] float-right">
              <Link to="/Forgot-Password"> Forget Password</Link>
            </span>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            <Link to="/SignUp"> Sign Up</Link>
          </span>
        </p>
      </div>
    </section>
  )
}

export default AuthLogin
