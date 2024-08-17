import { ReactNode } from "react";

type ElementProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export const Element = ({
  as: asElement,
  className,
  children,
}: ElementProps) => {
  if (!children) return null;

  const DomElement = asElement || "p";

  return <DomElement className={className}>{children}</DomElement>;
};