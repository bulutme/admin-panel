import type { CSSProperties, ReactNode } from "react";

export type ITypographyAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export type ITypographyVariant =
  | "header-large"
  | "header-base"
  | "header-small"
  | "body-base"
  | "body-large"
  | "body-small"
  | "subtext";

export type ITypographyColor = "primary" | "secondary" | "tertiary";

export interface ITypography {
  as?: ITypographyAs;
  children: ReactNode | string;
  color: ITypographyColor;
  variant: ITypographyVariant;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}
