// src/components/DelayedSpinner.jsx
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function DelayedSpinner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000); // ⏰ 3초 후에 스피너 뜨게 일부러 늦춤
    return () => clearTimeout(timer);
  }, []);

  return show ? <LoadingSpinner /> : null;
}
