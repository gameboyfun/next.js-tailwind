import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface NavItem {
    name: string;
    role?: number;
    url: string;
    icon: IconDefinition;
    children?: NavItem[];
  }
  