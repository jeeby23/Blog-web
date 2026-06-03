import { useState, useEffect } from 'react'

const AboutInfo = () => {
  const [about, setAbout] = useState([])
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${API_URL}/about`)
      .then((res) => res.json())
      .then((data) => {
        setAbout(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <section>
      <div>
        <img src="/assets/about.png" alt="about-image" className="w-full h-139 object-cover" />

        <div>
          <h1 className="font-bold py-3">About Me</h1>

          {about.map((item) => (
            <div key={item._id}>
              <p className="text-justify mb-4">{item.about}</p>

              <h2 className="font-semibold py-3">Skills:</h2>

              <ul className="list-disc pl-5">
                {item.skills
                  .split('\n')
                  .filter((skill) => skill.trim() !== '')
                  .map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
              </ul>

              <h2 className="font-semibold py-3">Experience:</h2>
              <ul className="list-disc pl-5">
                {item.experience
                  .split('\n')
                  .filter((experienc) => experienc.trim() !== '')
                  .map((experienc, index) => (
                    <li key={index}>{experienc}</li>
                  ))}
              </ul>

              <h2 className="font-semibold py-3">Education:</h2>
              <ul className="list-disc pl-5 ">
                {item.education
                  .split('\n')
                  .filter((educatio) => educatio.trim() !== '')
                  .map((educatio, index) => (
                    <li key={index}>{educatio}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutInfo
