import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => {
  const [file, setFile] = useState('');
  const videoRef = useRef(null)
  useEffect(() => {
    const handleMessage = (_event, args) => {
      console.log('====================================');
      console.log(window.URL.createObjectURL(args[0]));
      console.log('====================================');
      setFile(window.URL.createObjectURL(args[0]))
      videoRef?.current && videoRef?.current?.load()
      // alert(args)
    };

    // listen to the 'message' channel
    window.electron.receiveFiles(handleMessage);

    return () => {
      window.electron.stopReceivingFiles(handleMessage);
    };
  }, []);

  const onSayHiClick = () => {
    window.electron.sayHello();
  };

  return (
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <h1 className="p-2">Hello Next.js 👋</h1>
      <button onClick={onSayHiClick}>Say hi to electron</button>
      <p>
        <Link href="/about">About</Link>
      </p>
      {
        file && <video
          id="compress-video-player"
          className="h-full w-full rounded-3xl"
          controls
          autoPlay
          playsInline
          ref={videoRef}
        >
          <source src={file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      }
    </Layout>
  );
};

export default IndexPage;
