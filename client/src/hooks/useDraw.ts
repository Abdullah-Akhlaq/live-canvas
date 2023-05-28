import React, { useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);
  const [mouseDown, setMovedown] = useState(false);
  const MouseDownHandler = () => setMovedown(true);

  const resetHandler = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const currentPoint = computerPointInCanvas(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (!mouseDown) return;

      if (!ctx || !currentPoint) {
        return;
      }
      onDraw({ ctx, currentPoint, prevPoint: prevPoint?.current });
      prevPoint.current = currentPoint;
    };

    const MouseUpHandler = () => {
      setMovedown(false);
      prevPoint.current = null;
    };

    const computerPointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    window.addEventListener("mouseup", MouseUpHandler);
    canvasRef.current?.addEventListener("mousemove", handler);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler),
        window.removeEventListener("mouseup", MouseUpHandler);
    };
  }, [onDraw]);

  return { canvasRef, MouseDownHandler, resetHandler };
};
