import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '../../schema/auth.schema'
import api from '../../utils/api'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'


export default function AuthResetPass() {
    const navigate = useNavigate()
    const {token} = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) })

  const onSubmit = async (data) => {
     console.log("SUBMIT CLICKED", data)
    try {
      const res = await api.put(`/auth/reset-password/${token}`,{password:data.password})
      if (res.data) {
        toast.success('Password chnaged succesfully')
        navigate('/Login')
      }
    } catch (error) {
         toast.error(error.response?.data?.message || 'Something went wrong')
    }
  } 
  return (
   <section className="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4"
  >
    <h2 className="text-xl font-bold text-center">Reset Password</h2>

    <div className="flex flex-col gap-2">
      <input
        type="password"
        placeholder="Enter new password"
        {...register('password')}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {errors.password && (
        <p className="text-red-500 text-sm">
          {errors.password.message}
        </p>
      )}
    </div>

    <button
      type="submit"
      className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-700 transition duration-300"
    >
      {isSubmitting ? 'Resetting...' : 'Reset'}
    </button>
  </form>
</section>
  )
}
