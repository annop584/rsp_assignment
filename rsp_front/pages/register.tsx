import React, { useState } from "react";
import { useEffect } from "react";
import Router from "next/router";
import styles from "@/styles/pages/Login.module.scss";
import Loader from "@/components/Loader";
import useSignup from "@/src/hooks/useSignup";
import useChecksignin from "@/src/hooks/useChecksignin";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type Props = {};
type UserRegisterForm = {
  email: string;
  password: string;
  confirmpassword: string;
};

export default function Register({}: Props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const { signUp } = useSignup();
  const { isSignin } = useChecksignin();

  //react hookform
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegisterForm>(formOptions);

  const registerapi = async () => {
    const valid = await signUp(email, password);
    if (valid.success == true) {
      Router.push("/gameplay");
    } else {
      alert(valid.message);
    }
  };

  const setEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setemail(event.currentTarget.value);
  };
  const setPassword = (event: React.FormEvent<HTMLInputElement>) => {
    setpassword(event.currentTarget.value);
  };
  const setConfirmpassword = (event: React.FormEvent<HTMLInputElement>) => {
    setconfirmpassword(event.currentTarget.value);
  };

  const onSubmit = handleSubmit((data: UserRegisterForm) => {
    registerapi();
  });
  //end react hookform

  useEffect(() => {
    if (isSignin) {
      Router.push("/gameplay");
    } else {
    }
  }, [isSignin]);

  return (
    <div>
      {isSignin == false && (
        <>
          <div className={styles.center}>
            <form onSubmit={onSubmit} autoComplete="off">
              <h1>🤘🏼 ✂️ 🧾</h1>
              <div className={styles.form}>
                <label>
                  Email
                  <br></br>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    onChange={setEmail}
                    value={email}
                  />
                  {errors.email ? (
                    <p className={styles.errortext}>{errors.email?.message}</p>
                  ) : (
                    <></>
                  )}
                </label>

                <label>
                  Password
                  <br></br>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    onChange={setPassword}
                    value={password}
                  />
                  {errors.password ? (
                    <p className={styles.errortext}>
                      {errors.password?.message}
                    </p>
                  ) : (
                    <></>
                  )}
                </label>

                <label>
                  ConfirmPassword
                  <br></br>
                  <input
                    id="confirmpassword"
                    type="password"
                    {...register("confirmpassword")}
                    onChange={setConfirmpassword}
                    value={confirmpassword}
                  />
                  {errors.confirmpassword ? (
                    <p className={styles.errortext}>
                      {errors.confirmpassword?.message}
                    </p>
                  ) : (
                    <></>
                  )}
                </label>
              </div>

              <p>
                {" "}
                <button id="submit" type="submit">
                  <span>Register</span>
                </button>
              </p>
            </form>
          </div>
        </>
      )}

      {isSignin == undefined && (
        <>
          <Loader />
        </>
      )}
    </div>
  );
}
