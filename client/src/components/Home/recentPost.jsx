import { useEffect, useState } from 'react'

export default function RecentPost() {
  const [posts, setPosts] = useState([])
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${API_URL}/posts/recent`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  return (
    <section className="py-5">
      <h2 className="font-semibold text-2xl py-4">Recent blog posts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {posts[0] && (
          <div>
            <img src={posts[0].image} className="h-57 w-full object-cover" />
            <small className="text-[#6941C6] py-5">
              {new Date(posts[0].createdAt).toDateString()}
            </small>
            <h3 className="font-semibold text-xl">{posts[0].title}</h3>

            <p className="text-[#667085]">{posts[0].description}</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {posts[1] && (
            <div className="flex flex-col md:flex-row items-start gap-5">
              <img src={posts[1].image} className="h-50 w-[320px] object-cover" />
              <div>
                <small className="text-[#6941C6] font-semibold">
                  {new Date(posts[1].createdAt).toDateString()}
                </small>
                <h2 className="text-xl py-2">{posts[1].title}</h2>
                <p className="text-[#667085] text-justify">{posts[1].description}</p>
              </div>
            </div>
          )}

          {posts[2] && (
            <div className="flex flex-col md:flex-row items-start gap-5">
              <img src={posts[2].image} className="h-50 w-[320px] object-cover" />
              <div>
                <small className="text-[#6941C6] font-semibold">
                  {new Date(posts[2].createdAt).toDateString()}
                </small>
                <h2 className="text-xl py-2">{posts[2].title}</h2>
                <p className="text-[#667085] text-justify">{posts[2].description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
