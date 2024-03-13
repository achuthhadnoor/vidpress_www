import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full  pb-0 z-30 bg-neutral-900/90 backdrop-blur-lg">
      <div className="w-full p-3 lg:p-4 max-w-5xl mx-auto  flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <p className="font-semibold sm:text-xl">Vidpress</p>
        </Link>
        <div className="sm:flex gap-4 items-center justify-center hidden">
          <a href="#features" className="text-sm opacity-50">
            Features
          </a>
          <a href="#pricing" className="text-sm opacity-50">
            Pricing
          </a>
          <a href="#faq" className="text-sm opacity-50">
            Faq
          </a>
          <div className="flex justify-end items-center">
            <Link
              href="/video"
              className="bg-teal-900 rounded-lg text-white/90 px-3.5 py-2.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-teal-950 flex-shrink-0"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
