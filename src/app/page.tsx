"use client";

import LayoutMini from "./components/LayoutMini";

export default function Home() {
  /* useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // reload full page
    }, 5 * 60 * 1000); // 5 menit

    return () => clearInterval(interval); // cleanup
  }, []); */

  return (
    <>
      <LayoutMini />
      {/* {process.env.AQMS_TYPE === 'fixed' ?  : <LayoutMini/> } */}
    </>
  );
}
