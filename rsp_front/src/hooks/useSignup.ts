import { signUp } from "@/src/apis/users";
import { initToken } from "@/src/utils/jwtutil";
export default function useSignup() {
  return {
    signUp: async (email: string, password: string) => {
      const user = await signUp(email, password);
      if (user.success == true && user.data) {
        await initToken(user.data.email, user.data.token);
        return user;
      } else {
        return user;
      }
    },
  };
}
