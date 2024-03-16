'use client'
import dynamic from "next/dynamic";
import { useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
const CompressVideo = dynamic(() => import("./components/compress"), {
  ssr: false,
});

const Page = () => {
  // verify license 
  const { user, updateUser } = useLocalStorage();
  const [email, setEmail] = useState<string | null>(null);
  const [license, setLicense] = useState<string | null>(null);

  return (
    <>
      {user ? <CompressVideo /> : <div className="absolute h-screen w-full flex justify-center items-center align-middle">
        <div className="max-w-md w-full text-center gap-2 flex flex-col">
          <h2 className="text-2xl font-semibold p-2 text-yellow-600">Activate License key</h2>
          <input type="email" autoComplete="false" className="outline-none bg-neutral-800 text-center rounded p-2" placeholder="activate@email.now" required onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <input type="text" autoComplete="false" className="outline-none bg-neutral-800 text-center rounded p-2" placeholder="xxxx-xxxx-xxxx-xxxx" required onChange={(e) => {
            setLicense(e.target.value)
          }} />
          <input type="submit" className="bg-yellow-800 rounded p-2 disabled:bg-neutral-700 disabled:cursor-not-allowed" disabled={(email && license) ? false : true} />
        </div>
      </div>}
    </>
  );
};

export default Page;
