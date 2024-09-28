import "./index.css";

export default function LoadingIndicator() {
  return (
    <div
      className={`
        size-[50px] relative bottom-3
        before:w-[50px] before:h-[5px] before:bg-black/15 before:dark:bg-white/25 before:absolute before:top-[59px] before:left-0 before:rounded-full before:animate-[loading-shadow_0.5s_linear_infinite]
        after:size-[50px] after:bg-[--ant-color-primary] after:rounded-md after:absolute after:top-0 after:left-0 after:animate-[loading-animate_0.5s_linear_infinite]
      `}
    />
  );
}
