"use client";

import { useEffect, useRef, useState } from "react";

export default function RevealLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`border-border origin-left transition-transform duration-700 ease-out ${
        visible ? "scale-x-100" : "scale-x-0"
      } ${className}`}
    />
  );
}
