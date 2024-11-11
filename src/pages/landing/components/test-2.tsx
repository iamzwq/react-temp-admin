import { Button } from "antd";
import { useSelector, useTestStore } from "@/stores";

export function Test2() {
  const { b, addB } = useTestStore(useSelector(["b", "addB"]));
  return (
    <div className="flex flex-col gap-4 items-center justify-center border border-teal-400 w-[300px] h-[200px] rounded-sm">
      <Button onClick={addB}>test-2: {b}</Button>
      <p>{Math.random()}</p>
    </div>
  );
}
