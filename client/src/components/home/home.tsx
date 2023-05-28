import { useDraw } from "@/hooks/useDraw";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
export const HomeComp = () => {
  const { canvasRef, MouseDownHandler, resetHandler } = useDraw(drawline);
  // const
  function drawline({ ctx, currentPoint, prevPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;
    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 3 * Math.PI);
    ctx.fill();
  }
  const [color, setColor] = useState("#000");
  return (
    <div className="home-wrapper">
      <canvas
        width={600}
        height={600}
        style={{
          boxShadow: "1px 1px 15px 5px #888888",
        }}
        ref={canvasRef}
        onMouseDown={MouseDownHandler}
      />
      <div>
        <ChromePicker color={color} onChange={(e: any) => setColor(e.hex)} />
        <button onClick={resetHandler} className="button">
          Reset Points
        </button>
      </div>
    </div>
  );
};
