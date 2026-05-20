import { useState } from 'react'
import RootLayout from '../../Layout/RootLayout'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'


const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState([])
  const [image, setImage] = useState('')
  const [submit, setSubmit] = useState('')
  const [cancel, setCancel] = useState('')

  const API_URL = import.meta.env.VITE_API_URL

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Error occured')
      return response.json()
    },
    onSuccess: () => {
     toast.success("Post created successfully")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('content', JSON.stringify([{ type: 'paragraph', text: content }]))
    mutate(formData)
  }
  return (
    <section>
      <RootLayout>
        <div className="flex flex-col justify-center flex-1">
          <h1 className="flex justify-center bg-gray-100 p-4 text-gray-400">Create New Post</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore dolores
            quod, veniam rerum enim?
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="block text-sm font-medium text-gray-500 mt-2">
              Post Title
            </label>
            <input
              type="text"
              label="post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="post title"
              className="border border-gray-400 p-1.5 w-full my-3 rounded-xl"
            />
            <label htmlFor="title" className="block text-sm font-medium text-gray-500">
              Post Description
            </label>
            <input
              type="text"
              label="post description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="post description"
              className="border border-gray-400 p-1.5 w-full my-3 rounded-xl"
            />

            <label htmlFor="title" className="block text-sm font-medium text-gray-500">
              Post Contents
            </label>
            <textarea
              className="border border-gray-500 flex my-2 w-full h-64 rounded-xl p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post content"
            />
            <label htmlFor="image" className="block text-sm font-medium text-gray-500">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-dashed border-gray-700 px-10 py-3 w-50 rounded-xl space-y-3"
            />
            <button className="border border-2-gray-300 rounded-full py-3 px-6 my-2 mx-2">
              cancel
            </button>
            <button
              className="border border-2-gray-300 bg-gray-600 text-white rounded-full py-3 px-6 my-2 mx-2"
              type="submit"
              value={submit}
              onChange={(e) => setSubmit(e.target.value)}
            >
              submit
            </button>
          </form>
          <hr />
        </div>
      </RootLayout>
    </section>
  )
}

export default CreatePost
