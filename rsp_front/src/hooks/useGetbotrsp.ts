import { getRandomRsp } from "@/src/apis/scp";
import { getToken } from "@/src/utils/jwtutil";
export default function useGetbotrsp() {
  return {
    getRandomRsp: async () => {
      const token = getToken();
      if (token != null) {
        const score = await getRandomRsp(token);
        return score;
      } else {
        return {
          success: false,
          //   data: err.response.data,
          data: null,
          message: "err.response.data.message",
        };
      }
    },
  };
}
