// src/components/DelayedSpinner.jsx
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function DelayedSpinner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000); // 1초 후에 스피너 보이게
    return () => clearTimeout(timer);
  }, []);

  return show ? <LoadingSpinner /> : null;
}
