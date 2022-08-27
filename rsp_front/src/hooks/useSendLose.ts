import { resetScore } from "@/src/apis/scp";
import { getToken } from "@/src/utils/jwtutil";
export default function useSendLose() {
  return {
    sendLose: async () => {
      const token = getToken();
      if (token != null) {
        const score = await resetScore(token);
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
