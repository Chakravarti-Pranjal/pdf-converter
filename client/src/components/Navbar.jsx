
const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 md:px-20 shadow-sm fixed">
  <div className="flex-1">
    <a className="btn btn-ghost text-2xl font-extrabold">Docx<span className="text-cyan-400 font-bold  mx-[-6px] text-3xl">To</span>PDF</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 font-semibold text-[16px]">
      <li className="hover:scale-125"><a>Home</a></li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="bg-base-100 rounded-t-none p-2 w-56">
            <li><a>Merge Pdf</a></li>
            <li><a>Edit pdf</a></li>
            <li><a>Remove pdf</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
    </>
  )
}

export default Navbar
