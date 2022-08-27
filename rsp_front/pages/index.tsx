import useChecksignin from "@/src/hooks/useChecksignin";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";

// import useCheckLogin from "@/src/hooks/useCheckLogin";

const Home: NextPage = () => {
  const { isSignin } = useChecksignin();
  useEffect(() => {
    if (isSignin) {
      Router.push("/gameplay");
    } else {
      Router.push("/login");
    }
  }, [isSignin]);
  return <div></div>;
};

export default Home;
