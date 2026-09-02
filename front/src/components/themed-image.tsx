"use client";

import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

interface ThemedImageProps extends Omit<ImageProps, "src"> {
  lightSrc: string;
  darkSrc: string;
}

export function ThemedImage({
  lightSrc,
  darkSrc,
  alt,
  ...props
}: ThemedImageProps) {
  const { resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  const src = !isMounted || resolvedTheme === "dark" ? darkSrc : lightSrc;

  return <Image src={src} alt={alt} {...props} />;
}
