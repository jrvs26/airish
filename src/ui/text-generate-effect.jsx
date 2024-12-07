"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../libs/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0,

}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate("span", {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
    }, {
      duration: duration ? duration : 1,
      delay: stagger(0.2),
    });
  }, [scope.current]);

  const renderWords = () => {
    return (
      (<motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            (<motion.span
              key={word + idx}
              className="text-white bg-green-500 opacity-1 rounded-xl"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {word}{" "}
            </motion.span>)
          );
        })}
      </motion.div>)
    );
  };

  return (
    (<div className={cn("font-semibold bg-green-500 rounded-xl", className)}>
      <div className="mt-1 ml-1">
        <div
          className="text-white bg-green-500 text-md leading-snug tracking-wide rounded-xl">
          {renderWords()}
        </div>
      </div>
    </div>)
  );
};
