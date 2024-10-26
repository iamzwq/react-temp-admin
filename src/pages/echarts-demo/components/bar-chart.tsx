import { useEffect, useMemo, useRef } from "react";
import { graphic } from "echarts/core";
import { ReactEcharts } from "@/components/react-echarts";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/utils";

let data = [10, 52, 200, 334, 390, 330, 220];

interface BarChartProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function BarChart({ className, style }: BarChartProps) {
  const ref = useRef<any>(null);
  const { isDarkMode } = useTheme();

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: 24,
        bottom: 32,
        left: 48,
        right: 24,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "#eee",
            },
          },
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          itemStyle: {
            color: new graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#8bc8ff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#1990ff", // 100% 处的颜色
                },
              ],
              false,
            ),
            borderRadius: [30, 30, 0, 0],
          },
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    const run = (data: number[]) => {
      ref.current?.getEChartInstance().setOption({
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              color: new graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#8bc8ff", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1990ff", // 100% 处的颜色
                  },
                ],
                false,
              ),
              borderRadius: [30, 30, 0, 0],
            },
            data,
          },
        ],
      });
    };
    const timer = setInterval(() => {
      data = data.map(() => Math.round(Math.random() * 500));
      run(data);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ReactEcharts
      option={option}
      className={cn("w-full h-96", className)}
      style={style}
      theme={isDarkMode ? "dark" : "light"}
      renderer="svg"
      ref={ref}
    />
  );
}
