import { useState, useEffect } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export default function Image({
  src,
  alt,
  fallback = "/placeholder.svg",
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setImgSrc(fallback);
        setIsLoading(false);
      }}
      className={`
        transition-opacity duration-300
        ${isLoading ? "opacity-0" : "opacity-100"}
        ${props.className || ""}
      `}
    />
  );
}
