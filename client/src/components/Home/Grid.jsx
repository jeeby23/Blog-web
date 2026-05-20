
export default function Grid() {
  return (
    <section className='my-10'>
      <div className='flex flex-col md:flex-col  lg:flex-row gap-10 items-start'>
        <img src="/assets/climate.png" className="h-[188px] w-[770px] md:w-[552px] object-cover" />
        <div>
          <small className='text-[#6941C6]'>Sunday, 1 Jan 2023</small>
          <h2 className='font-semibold text-xl py-3'>Grid system for better Design User Interface</h2>
          <p className='text-[#667085] text-justify '>
            A grid system is a design tool used to arrange content on a webpage. It is a series of
            vertical and horizontal lines that create a matrix of intersecting points, which can be
            used to align and organize page elements. Grid systems are used to create a consistent
            look and feel across a website, and can help to make the layout more visually appealing
            and easier to navigate 
          </p>
        </div>
      </div>
    </section>
  )
}
