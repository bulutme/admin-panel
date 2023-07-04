import type { CSSProperties, ReactNode } from "react";

export interface IButton {
  text?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}
