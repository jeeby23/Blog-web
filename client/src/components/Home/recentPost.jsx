export default function recentPost() {
  return (
    <section className="py-5">
      <h2 className="font-semibold text-2xl py-4">Recent blog posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <img src="/assets/recentP.png" className="h-[228px] w-full object-cover" />
          <small className="text-[#6941C6] py-5">Olivia Rhye • 1 Jan 2023</small>

          <h3 className="font-semibold text-xl">UX review presentation</h3>

          <p className="text-[#667085]">
            How do you create compelling presentations that wow your colleagues and impress your
            managers?
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row items-start gap-5">
            <img src="/assets/Phoenix.png" className="h-[200px] w-[320px] object-cover" />
            <div>
              <small className="text-[#6941C6] font-semibold">Phoenix Baker 1 Jan 2023</small>
              <h2 className="text-xl py-2">Migrating to Linear 101</h2>
              <p className="text-[#667085] text-justify">
                Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s
                how to get...
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row  items-start gap-5">
            <img src="/assets/Lana.png" className="h-[200px] w-[320px] object-cover" />
            <div>
              <small className="text-[#6941C6] font-semibold">Lana Steiner 1 Jan 2023</small>
              <h2 className="text-xl py-2">Migrating to Linear 101</h2>
              <p className="text-[#667085] text-justify">
                The rise of RESTful APIs has been met by a rise in tools for creating,testing, and
                manag...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
