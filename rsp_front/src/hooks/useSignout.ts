import Router from "next/router";
export default function useSignout() {
  return {
    signOut: async () => {
      localStorage.removeItem("jwt");
      Router.push("login");
    },
  };
}
