import React, { useEffect, useState } from "react";
import { RSP_TYPE } from "@/src/constants/gameplay";
import styles from "@/styles/components/RSPsymbol.module.scss";
type Props = {
  type: number;
  isDisabled: boolean;
  selectRspFunc?: (rsp: number) => void;
};

export default function RSPsymbol({ type, isDisabled, selectRspFunc }: Props) {
  const [symbol, setsymbol] = useState<string>("♥️");

  useEffect(() => {
    switch (type) {
      case RSP_TYPE.ROCK:
        setsymbol("👊");
        break;

      case RSP_TYPE.SCISSORS:
        setsymbol("✌🏻");
        break;

      case RSP_TYPE.PAPER:
        setsymbol("🖐🏼");
        break;
      case RSP_TYPE.RIDDLE:
        setsymbol("❔");
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div
      className={`${
        type != RSP_TYPE.SCISSORS ? styles.boxsize : styles.boxsize_center
      }`}
    >
      <button
        id={symbol}
        disabled={isDisabled}
        onClick={() => {
          if (type != RSP_TYPE.RIDDLE && selectRspFunc != undefined) {
            selectRspFunc(type);
          } else {
            alert("CantCLick");
          }
        }}
      >
        {symbol}
      </button>
    </div>
  );
}
