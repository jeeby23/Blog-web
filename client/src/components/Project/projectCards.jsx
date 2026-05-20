import { useEffect } from 'react'
import { useState } from 'react'

export default function project() {
  const API_URL = import.meta.env.VITE_API_URL
  const [project, setProject] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/project`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <section className='my-4'>
  <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
    {project.map((item, index) => (
      <div
        key={item._id}
        className={`
          ${index === 2 ? "col-span-2" : ""}
        `}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-auto object-cover rounded-lg"
        />
        <h1 className="text-lg font-semibold mt-3">{item.title}</h1>
        <p className="text-gray-500 text-sm mt-2 text-justify">{item.desc}</p>
      </div>
    ))}
  </div>
</section>
  )
}
