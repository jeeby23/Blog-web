import { useState } from 'react'
import RootLayout from '../../Layout/RootLayout'
import { useMutation} from '@tanstack/react-query'
import { toast } from 'sonner'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'image',
]

const CreatePost = () => {
  const [form, setForm] = useState({
    _id: '',
    title: '',
    description: '',
    content: '',
    image: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

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
      toast.success('Post created successfully')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('image', form.image)
formData.append("content", form.content)
    mutate(formData)
  }
  return (
    <section>
      <RootLayout>
        <div className="flex flex-col justify-center z-50">
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
              value={form.title}
              name="title"
              onChange={handleChange}
              placeholder="post title"
              className="border border-gray-400 p-1.5 w-full my-3 rounded-xl"
            />
            <label htmlFor="title" className="block text-sm font-medium text-gray-500">
              Post Description
            </label>
            <input
              type="text"
              label="post description"
              value={form.description}
              name="description"
              onChange={handleChange}
              placeholder="post description"
              className="border border-gray-400 p-1.5 w-full my-3 rounded-xl"
            />

            <label className="block text-sm font-medium text-gray-500">Post Contents</label>

            <ReactQuill
              value={form.content}
              onChange={(value) => setForm((prev) => ({ ...prev, content: value }))}
              modules={modules}
              formats={formats}
              className="bg-white my-3"
            />
            <label htmlFor="image" className="block text-sm font-medium text-gray-500">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="border border-dashed border-gray-700 px-10 py-3 w-50 rounded-xl space-y-3"
            />
            <button className="border border-2-gray-300 rounded-full py-3 px-6 my-2 mx-2">
              cancel
            </button>
            <button
              className="border border-2-gray-300 bg-gray-600 text-white rounded-full py-3 px-6 my-2 mx-2"
              type="submit"
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
