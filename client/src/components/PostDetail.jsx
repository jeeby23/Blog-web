import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RootLayout from '../Layout/RootLayout'

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!post) return <p>Post not found</p>

  return (
    <section>
      <RootLayout>
      <img src={post.image} alt={post.title} className='w-full h-60 object-fill ' />
      <h1 className='font-semibold capitalize py-4'>{post.title}</h1>
      <p className='text-[#6941C6] font-semibold py-2'>{post.date}</p>
      <p>{post.description}</p>
      {post.content.map((item, index) => {
        if (item.type === 'heading') {
          return (
            <h2 key={index} className="text-2xl font-semibold mt-6 mb-2 text-justify">
              {item.text}
            </h2>
          )
        }
        if (item.type === 'paragraph') {
          return (
            <p key={index} className="text-gray-700 mb-4 text-justify">
              {item.text}
            </p>
          )
        }
        return null
      })}
      </RootLayout>
    </section>
  )
}

export default PostDetail
