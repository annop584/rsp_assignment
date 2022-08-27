import { useEffect, useState } from "react";

export default function useChecksignin() {
  const [isSignin, setisSignin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setisSignin(true);
    } else {
      setisSignin(false);
    }
  }, []);

  return {
    isSignin: isSignin,
  };
}
