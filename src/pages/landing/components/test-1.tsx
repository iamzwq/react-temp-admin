import { Button } from "antd";
import { useSelector, useTestStore } from "@/stores";

export function Test1() {
  const { a, addA } = useTestStore(useSelector(["a", "addA"]));
  return (
    <div className="flex flex-col gap-4 items-center justify-center border border-teal-400 w-[300px] h-[200px] rounded-sm">
      <Button onClick={addA}>test-1: {a}</Button>
      <p>{Math.random()}</p>
    </div>
  );
}
