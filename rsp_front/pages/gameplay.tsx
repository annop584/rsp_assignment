import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import RSPsymbol from "@/components/RSPsymbol";
import { RSP_TYPE } from "@/src/constants/gameplay";
import styles from "@/styles/pages/Gameplay.module.scss";
import useChecksignin from "@/src/hooks/useChecksignin";
import useSignout from "@/src/hooks/useSignout";
import Router from "next/router";
import useGetScores from "@/src/hooks/useGetScores";
import useGetbotrsp from "@/src/hooks/useGetbotrsp";
import { rspResult } from "@/src/utils/rsputils";
import useSendWin from "@/src/hooks/useSendWin";
import { getEmail } from "@/src/utils/jwtutil";
import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_ENDPOINT as string);

type Props = {};

export default function Gameplay({}: Props) {
  const [username, setnowusername] = useState<string>("");
  const [yourScore, setyourScore] = useState<number>(0);
  const [highScore, sethighScore] = useState<number>(0);
  const [randomRSPenemy, setrandomRSPenemy] = useState<number>(RSP_TYPE.RIDDLE);
  const [resultText, setresulttext] = useState<string>("");
  const [isBtnDisable, setisBtnDisable] = useState<boolean>(false);
  const { getScore } = useGetScores();
  const { getRandomRsp } = useGetbotrsp();
  const { isSignin } = useChecksignin();
  const { signOut } = useSignout();
  const { sendWin } = useSendWin();

  //socket
  const sendHighscore2socket = (highScore: number) => {
    socket.emit("msgToServer", highScore);
  };

  socket.on("msgToClient", (data: number) => {
    sethighScore(data);
  });
  //end socket

  const setNewScore = (new_score: number, new_high_score: number) => {
    setyourScore(new_score);
    sethighScore(new_high_score);
  };

  const clearUI = () => {
    setisBtnDisable(false);
    setrandomRSPenemy(RSP_TYPE.RIDDLE);
    setresulttext("");
  };

  const selectRSP = async (selected_rsp: number) => {
    const botrsp_res = await getRandomRsp();
    if (botrsp_res.data) {
      setrandomRSPenemy(botrsp_res.data.botrsp);
      const result = rspResult(botrsp_res.data.botrsp, selected_rsp);
      setresulttext(result);
      setisBtnDisable(true);
      setTimeout(async () => {
        if (result === "win") {
          const respdata = await sendWin();
          if (respdata.success && respdata.data) {
            setNewScore(respdata.data.yourscore, respdata.data.highscore);
            if (respdata.data.isnewhigh) {
              sendHighscore2socket(respdata.data.highscore);
            }
          }
        } else {
        }
        clearUI();
      }, 2000);

      // alert(result);
    }
  };

  useEffect(() => {
    const getscoresfromApi = async () => {
      const resp = await getScore();
      if (resp.data) {
        setyourScore(resp.data.yourscore);
        sethighScore(resp.data.highscore);
        const email = await getEmail();
        setnowusername(email);
      }
    };
    getscoresfromApi();
  }, []);

  useEffect(() => {
    if (isSignin == false) {
      Router.push("/login");
    } else {
    }
  }, [isSignin]);

  return (
    <div className={styles.container}>
      {isSignin == true && (
        <>
          <div className={styles.header_layout}>
            <h3>Hi: {username}</h3>
            <button id="signout" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
          <div className={styles.gameplay_content_wrap}>
            <div className={styles.show_score_layout}>
              <h2>
                Your Score : <span>{yourScore}</span> turn
              </h2>
              <h2>
                High Score : <span>{highScore}</span> turn
              </h2>
            </div>
            <hr></hr>
            <div className={styles.rps_selection_vertical_layout}>
              <h1 id="result">{resultText == "" ? "🤖" : resultText}</h1>
              <RSPsymbol type={randomRSPenemy} isDisabled={true} />
            </div>
            <div className={styles.rps_selection_horizon_layout}>
              <RSPsymbol
                type={RSP_TYPE.ROCK}
                isDisabled={isBtnDisable}
                selectRspFunc={selectRSP}
              />
              <RSPsymbol
                type={RSP_TYPE.SCISSORS}
                isDisabled={isBtnDisable}
                selectRspFunc={selectRSP}
              />
              <RSPsymbol
                type={RSP_TYPE.PAPER}
                isDisabled={isBtnDisable}
                selectRspFunc={selectRSP}
              />
            </div>
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
