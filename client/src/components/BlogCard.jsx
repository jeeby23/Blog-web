
export default function BlogCard({ title, description, image, date, children }) {
  return (
    <section>
      <div>
        {image && (
          <img src={image} alt={title} className="w-[384px] h-60 object-cover mb-3" />
        )}
        <small className="text-[#6941C6] font-semibold">{date}</small>
        <p className="font-semibold text-xl py-3">{title}</p>
        <p className="text-[#667085] text-justify">{description}</p>
        {children}
      </div>
    </section>
  )
}
