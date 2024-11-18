"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const id = React.useId();

  function reset() {
    setIsPlaying(false);
    setTimeElapsed(0);
  }

  React.useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeElapsed((currentTimeElapsed) => currentTimeElapsed + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [timeElapsed, isPlaying]);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={id}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
          <span>{selectedColor.label}</span>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={() => reset()}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
