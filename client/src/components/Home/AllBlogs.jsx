import BlogCard from '../BlogCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function AllBlogs() {
  const [posts, setPosts] = useState([])
  const [isloading, setisLoading] = useState(true)
  const featuredId = [
    '6a0f87222ab5991f6805f657',
    '6a109e1ef8a28f204dd70054',
    '6a109e1ef8a28f204dd70055',
    '6a109e1ef8a28f204dd70056'
  ]

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setisLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setisLoading(false)
      })
  }, [])
  if (isloading) return <p className="flex justify-around items-center h-1/2 ">Loading...</p>
  return (
    <section>
      <h1 className="font-semibold text-xl py-3">All blog posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts
      .filter(post => !featuredId.includes(post._id))
        .map((post) => (
          <Link key={post._id} to={`/blog/${ post.slug || post._id}`}>
            <BlogCard
              image={post.image}
              date={post.createdAt}
              title={post.title}
              description={post.description}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
