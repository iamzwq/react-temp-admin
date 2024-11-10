import { useRef } from "react";

type ClickHandler = (...args: any[]) => void;

/**
 * useClickDblClick is a custom hook that allows you to handle both click and double click events.
 * It uses a timer to delay the execution of the onDblClick function.
 * @param onClick - function to be executed on click event
 * @param onDblClick - function to be executed on double click event
 * @param delay - delay in milliseconds before executing onDblClick function (default is 300ms)
 * @returns a function that can be used as a click or double click event handler
 * @example
 * const singleClickHandler = (param) => {
 *   console.log("Single Clicked:", param);
 * };
 * const doubleClickHandler = (param) => {
 *   console.log("Double Clicked:", param);
 * };
 * const handleClick = useClickDblClick(singleClickHandler, doubleClickHandler);
 * <div onClick={handleClick}>Click me</div>
 */
export function useClickDblClick(onClick: ClickHandler, onDblClick: ClickHandler, delay = 300) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      onDblClick(...args);
    } else {
      timer.current = setTimeout(() => {
        onClick(...args);
        timer.current = null;
      }, delay);
    }
  };

  return handleClick;
}
