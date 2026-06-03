import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Grid() {
  const [post, setPost] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL
  const featuredId = '6a0f87222ab5991f6805f657'

  useEffect(() => {
    fetch(`${API_URL}/posts/${featuredId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
      })
  }, [])
  return (
    <section className="my-10">
      <div className="flex flex-col md:flex-col  lg:flex-row gap-10 items-start">
        {post ? (
          <div className='flex flex-col md:flex-row items-start gap-10 '>
            <img src={post.image} className="h-47 w-192.5 md:w-138 object-cover" />
            <div>
              
              <Link to={`/blog/${post.slug}`}>
                <h2 className="font-semibold text-xl py-3">{post.title}</h2>
              </Link>
              <p className="text-[#667085] text-justify ">{post.description}</p>
            </div>
          </div>
        ) : (
          <p>Loading </p>
        )}
      </div>
    </section>
  )
}
