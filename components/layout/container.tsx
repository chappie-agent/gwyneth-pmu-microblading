import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-[1200px]",
        size === "narrow" && "max-w-[800px]",
        size === "wide" && "max-w-[1400px]",
        className
      )}
    >
      {children}
    </div>
  );
}
