export default function BaseLayout({ children }) {
  return (
    <div>
      <main className="max-w-7xl mx-auto px-5 md:px-15 py-7.5">{children}</main>
    </div>
  )
}
