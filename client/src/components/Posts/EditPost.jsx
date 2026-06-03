import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '../../utils/api'
import RootLayout from '../../Layout/RootLayout'

const EditPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    description: '',
    content: '',
    image: ''
  }) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/slug/${slug}`)

        setFormData({
          _id: res.data._id,
          title: res.data.title,
          description: res.data.description,
          content: res.data.content?.[0]?.text || '',
          image: res.data.image
        })
      } catch (error) {
        console.error(error)
        toast.error("Failed to load post")
      } finally {
        setLoading(false) 
      }
    }

    fetchPost()
  }, [slug])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/posts/${formData._id}`, {
        title: formData.title,
        description: formData.description,
        content: [
          { type: 'paragraph', text: formData.content }
        ]
      })

      toast.success("Post updated successfully")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Update failed")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <RootLayout>
      <h1 className="text-xl font-semibold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post title"
          className="border p-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description"
          className="border p-2"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Post content"
          className="border p-2 h-40"
        />

        <button type='submit' className="bg-green-500 text-white p-2 rounded cursor-pointer">
          Update Post
        </button>
      </form>
    </RootLayout>
  )
}

export default EditPost