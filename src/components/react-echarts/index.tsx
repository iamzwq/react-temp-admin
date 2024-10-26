import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import echarts from "./library";
import { cn, debounce } from "@/utils";

interface ReactEchartsProps {
  theme?: string;
  renderer?: "canvas" | "svg";
  option: any;
  className?: string;
  style?: React.CSSProperties;
}

interface RefProps {
  getEChartInstance: () => echarts.ECharts | null;
}

export const ReactEcharts = forwardRef<RefProps, ReactEchartsProps>(function (
  { theme = "light", option, renderer, className, style },
  ref,
) {
  const eleRef = useRef(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  echarts.use(renderer === "svg" ? SVGRenderer : CanvasRenderer);

  useImperativeHandle(ref, () => ({
    getEChartInstance: () => chartInstance.current,
  }));

  useEffect(() => {
    if (eleRef.current) {
      chartInstance.current = echarts.init(eleRef.current, theme, { renderer });
      chartInstance.current.setOption(option);

      const onResize = debounce(() => {
        chartInstance.current?.resize();
      }, 500);

      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(eleRef.current);

      return () => {
        resizeObserver.disconnect();
        chartInstance.current?.dispose();
      };
    }
  }, [option, theme, renderer]);

  return <div ref={eleRef} className={cn("w-full h-full", className)} style={style} />;
});

ReactEcharts.displayName = "ReactEcharts";
