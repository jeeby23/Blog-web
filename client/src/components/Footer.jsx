const socialLinks = ["Twitter","LinkedIn", "Email", "RSS feed", "Add to feedly"]

export default function Footer() {
  return (
    <footer>
      <section>
        <div className=" flex justify-center gap-4 flex-1 bg-black p-4 text-white ">
          &copy; 2023 
          <ul className="flex flex-row gap-4">
            {socialLinks.map((link) => (
              <li key={link} >
                {link}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
}