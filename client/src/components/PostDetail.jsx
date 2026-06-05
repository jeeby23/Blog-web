import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RootLayout from '../Layout/RootLayout'
import { Pencil, Trash } from 'lucide-react'
import { toast } from 'sonner'
import api from '../utils/api'

const PostDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await api.get(`/posts/slug/${slug}`)
        setPost(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getPost()
  }, [slug])

  const handleEdit = () => {
    navigate(`/edit/${slug}`)
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post._id}`)
      toast.success("Post Deleted Successfully")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  if (loading) return <p>Loading...</p>
  if (!post) return <p>Post not found</p>

  return (
    <section>
      <RootLayout>
        <img src={post.image} alt={post.title} className="w-full h-60 object-fill" />

        <div className="flex items-center justify-between gap-5">
          <h1 className="font-semibold capitalize py-4">{post.title}</h1>

          <span className="flex gap-5">
            <button onClick={handleEdit} className="flex items-center gap-1 border p-2 rounded-full">
              <Pencil size={15} className="text-green-400" />
              Edit
            </button>

            <button onClick={handleDelete} className="flex items-center gap-1 border p-2 rounded-full">
              <Trash size={15} className="text-red-400" />
              Delete
            </button>
          </span>
        </div>

        <p className="text-[#6941C6] font-semibold py-2">{post.date}</p>
        <p>{post.description}</p>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </RootLayout>
    </section>
  )
}

export default PostDetail