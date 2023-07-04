import { ReactNode } from "react";

export interface ICard {
  text: string;
  className?: string;
  icon: ReactNode;
  type: string;
  info: string;
}
