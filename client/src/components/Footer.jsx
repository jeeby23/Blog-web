const socialLinks = ["Twitter","LinkedIn", "Email", "RSS feed", "Add to feedly"]

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full ">
      <div className="flex justify-center gap-4 bg-black p-4 text-white">
        &copy; 2023
        <ul className="flex flex-row gap-4">
          {socialLinks.map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>
      </div>
    </footer>
  )
}