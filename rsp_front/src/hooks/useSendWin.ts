import { updateScore } from "@/src/apis/scp";
import { getToken } from "@/src/utils/jwtutil";
export default function useSendWin() {
  return {
    sendWin: async () => {
      const token = getToken();
      if (token != null) {
        const score = await updateScore(token);
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
