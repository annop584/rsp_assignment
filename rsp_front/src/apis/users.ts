import { mainAPI } from "./config";

export interface TypeRespDataSignIn {
  token: string;
  score: number;
  email: string;
}

export interface TypeRespFormatSignIn {
  success: boolean | null;
  data: TypeRespDataSignIn | null;
  message: string | null;
}

export const signIn = async (
  email: string,
  password: string
): Promise<TypeRespFormatSignIn> => {
  return mainAPI
    .post<TypeRespFormatSignIn>(`/users/signin`, {
      email: email,
      password: password,
    })
    .then((res) => {
      let resp_obj = res.data as TypeRespFormatSignIn;
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

export const signUp = async (
  email: string,
  password: string
): Promise<TypeRespFormatSignIn> => {
  return mainAPI
    .post<TypeRespFormatSignIn>(`/users/signup`, {
      email: email,
      password: password,
    })
    .then((res) => {
      let resp_obj = res.data as TypeRespFormatSignIn;
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
