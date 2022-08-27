import { mainAPI } from "./config";

export interface TypeRespDataScores {
  yourscore: number;
  highscore: number;
  isnewhigh?: boolean;
}

export interface TypeRespFormatScores {
  success: boolean | null;
  data: TypeRespDataScores | null;
  message: string | null;
}

export interface TypeRespFormatBotRsp {
  success: boolean | null;
  data: { botrsp: number } | null;
  message: string | null;
}

export const getScore = async (
  token: string
): Promise<TypeRespFormatScores> => {
  return mainAPI
    .get<TypeRespFormatScores>(`/rsp/getscores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      let resp_obj = res.data as TypeRespFormatScores;
      return resp_obj;
    })
    .catch((err) => {
      if (err.response) {
        let resp_obj = {
          success: false,
          //   data: err.response.data,
          data: null,
          message: err.response.data.message,
        };
        return resp_obj;
      } else if (err.request) {
        let resp_obj = {
          success: false,
          data: null,
          message: "Please Check your Internet",
        };
        return resp_obj;
      } else {
        let resp_obj = {
          success: false,
          data: null,
          message: "Error",
        };
        return resp_obj;
      }
    });
};

export const updateScore = async (
  token: string
): Promise<TypeRespFormatScores> => {
  return mainAPI
    .get<TypeRespFormatScores>(`/rsp/updatescore`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      let resp_obj = res.data as TypeRespFormatScores;
      return resp_obj;
    })
    .catch((err) => {
      if (err.response) {
        let resp_obj = {
          success: false,
          //   data: err.response.data,
          data: null,
          message: err.response.data.message,
        };
        return resp_obj;
      } else if (err.request) {
        let resp_obj = {
          success: false,
          data: null,
          message: "Please Check your Internet",
        };
        return resp_obj;
      } else {
        let resp_obj = {
          success: false,
          data: null,
          message: "Error",
        };
        return resp_obj;
      }
    });
};

export const getRandomRsp = async (
  token: string
): Promise<TypeRespFormatBotRsp> => {
  return mainAPI
    .get<TypeRespFormatBotRsp>(`/rsp/botrandomrsp`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      let resp_obj = res.data as TypeRespFormatBotRsp;
      return resp_obj;
    })
    .catch((err) => {
      if (err.response) {
        let resp_obj = {
          success: false,
          //   data: err.response.data,
          data: null,
          message: err.response.data.message,
        };
        return resp_obj;
      } else if (err.request) {
        let resp_obj = {
          success: false,
          data: null,
          message: "Please Check your Internet",
        };
        return resp_obj;
      } else {
        let resp_obj = {
          success: false,
          data: null,
          message: "Error",
        };
        return resp_obj;
      }
    });
};
