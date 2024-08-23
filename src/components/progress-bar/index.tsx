import { useEffect } from "react";
import { theme } from "antd";
import NProgress from "nprogress";

import "nprogress/nprogress.css";

const changeProgressBarColor = (color: string) => {
  const nprogress = document.getElementById("nprogress");
  if (nprogress) {
    const bar: HTMLElement = nprogress.querySelector(".bar")!;
    const peg: HTMLElement = nprogress.querySelector(".peg")!;
    const spinner: HTMLElement = nprogress.querySelector(".spinner-icon")!;
    bar.style.background = color;
    bar.style.boxShadow = `0 0 2px ${color}`;
    peg.style.boxShadow = `0 0 10px ${color}, 0 0 5px ${color}`;
    spinner.style.borderTopColor = color;
    spinner.style.borderLeftColor = color;
  }
};

export function ProgressBar() {
  const { token } = theme.useToken();
  const { colorPrimary } = token;

  useEffect(() => {
    NProgress.start();
    changeProgressBarColor(colorPrimary);
    return () => {
      NProgress.done();
    };
  }, [colorPrimary]);

  return null;
}
