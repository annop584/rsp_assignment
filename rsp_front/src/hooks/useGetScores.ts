import { getScore } from "@/src/apis/scp";
import { getToken } from "@/src/utils/jwtutil";
export default function useGetScores() {
  return {
    getScore: async () => {
      const token = getToken();
      if (token != null) {
        const score = await getScore(token);
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
