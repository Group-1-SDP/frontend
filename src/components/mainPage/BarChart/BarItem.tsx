import { useSpring, animated } from "@react-spring/web";

type BarItemProps = {
  name: string;
  value: number;
  barHeight: number;
  barWidth: number;
  x: number;
  y: number;
};

type AnimatedProps = {
  barHeight: number;
  value: number;
  valueOpacity: number;
  x: number;
  y: number;
};

export const BarItem = (props: BarItemProps) => {
  const { name, value, barHeight, barWidth, x, y } = props;

  const springProps = useSpring<AnimatedProps>({
    // Adjust the 'from' value of y to start the animation from the bottom
    from: {
      value: 0,
      barHeight: 0,
      valueOpacity: 0,
      y: y + barHeight, // Start from the bottom of the bar
    },
    to: {
      value: value,
      barHeight: barHeight,
      valueOpacity: barHeight > 80 ? 1 : 0,
      y, // Animate towards the initial y position
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g>
      <animated.rect
        x={x}
        y={springProps.y}
        width={barWidth}
        height={springProps.barHeight}
        opacity={0.7}
        stroke="#046244"
        fill="#046244"
        fillOpacity={0.3}
        strokeWidth={1}
        rx={1}
      />
    </g>
  );
};
