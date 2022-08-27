import React, { useState } from "react";
import { useEffect } from "react";
import Router from "next/router";
import styles from "@/styles/pages/Login.module.scss";
import Loader from "@/components/Loader";
import useSignin from "@/src/hooks/useSignin";
import useChecksignin from "@/src/hooks/useChecksignin";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type Props = {};
type UserLoginForm = {
  email: string;
  password: string;
};

export default function Login({}: Props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { signIn } = useSignin();
  const { isSignin } = useChecksignin();

  //react hookform
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginForm>(formOptions);

  const loginapi = async () => {
    const valid = await signIn(email, password);
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

  const onSubmit = handleSubmit((data: UserLoginForm) => {
    loginapi();
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

                <Link href="register">
                  <a>register</a>
                </Link>
              </div>

              <p>
                {" "}
                <button id="submit" type="submit">
                  <span>Login</span>
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
