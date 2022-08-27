import { signIn } from "@/src/apis/users";
import { initToken } from "@/src/utils/jwtutil";
export default function useSignin() {
  return {
    signIn: async (email: string, password: string) => {
      const user = await signIn(email, password);
      if (user.success == true && user.data) {
        initToken(user.data.email, user.data.token);
        return user;
      } else {
        return user;
      }
    },
  };
}
