import Image from "next/image"

interface MSULogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function MSULogo({ size = "md", className = "" }: MSULogoProps) {
  const sizeMap = {
    sm: { width: 40, height: 40 },
    md: { width: 80, height: 80 },
    lg: { width: 120, height: 120 },
  }

  const { width, height } = sizeMap[size]

  return <Image src="/msu-logo.png" alt="MSU Logo" width={width} height={height} className={`${className}`} priority />
}
