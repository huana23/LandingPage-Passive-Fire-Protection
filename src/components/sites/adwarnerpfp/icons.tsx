// Lucide icon components, pre-resolved at module load. We export them by name
// (and a `pickIcon(name)` helper) so consumers can import what they need
// without ever calling icon(...) inside a render function — the lint rule
// `react-hooks/static-components` forbids that.

import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Menu,
  X,
  Phone,
  Play,
  ShieldCheck,
  HardHat,
  ClipboardCheck,
  Users,
  Construction,
  Ruler,
  Camera,
  FileText,
  Factory,
  ListChecks,
} from "lucide-react";
import type { ComponentType } from "react";

export const ArrowRightIcon = ArrowRight;
export const ArrowUpIcon = ArrowUp;
export const ArrowUpRightIcon = ArrowUpRight;
export const CheckIcon = Check;
export const MailIcon = Mail;
export const MapPinIcon = MapPin;
export const MenuIcon = Menu;
export const XIcon = X;
export const PhoneIcon = Phone;
export const PlayIcon = Play;
export const ShieldCheckIcon = ShieldCheck;
export const HardHatIcon = HardHat;
export const ClipboardCheckIcon = ClipboardCheck;
export const UsersIcon = Users;
export const ConstructionIcon = Construction;
export const RulerIcon = Ruler;
export const CameraIcon = Camera;
export const FileTextIcon = FileText;
export const FactoryIcon = Factory;
export const ListChecksIcon = ListChecks;

export type IconName =
  | "arrow-right"
  | "arrow-up"
  | "arrow-up-right"
  | "check"
  | "mail"
  | "map-pin"
  | "menu"
  | "x"
  | "phone"
  | "play"
  | "shield-check"
  | "hard-hat"
  | "clipboard-check"
  | "users"
  | "construction"
  | "ruler"
  | "camera"
  | "file-text"
  | "factory"
  | "list-checks";

const ICONS: Record<IconName, ComponentType<{ className?: string; strokeWidth?: number | string }>> = {
  "arrow-right": ArrowRightIcon,
  "arrow-up": ArrowUpIcon,
  "arrow-up-right": ArrowUpRightIcon,
  check: CheckIcon,
  mail: MailIcon,
  "map-pin": MapPinIcon,
  menu: MenuIcon,
  x: XIcon,
  phone: PhoneIcon,
  play: PlayIcon,
  "shield-check": ShieldCheckIcon,
  "hard-hat": HardHatIcon,
  "clipboard-check": ClipboardCheckIcon,
  users: UsersIcon,
  construction: ConstructionIcon,
  ruler: RulerIcon,
  camera: CameraIcon,
  "file-text": FileTextIcon,
  factory: FactoryIcon,
  "list-checks": ListChecksIcon,
};

export function pickIcon(name: IconName) {
  const C = ICONS[name];
  if (!C) throw new Error(`Unknown icon: ${name}`);
  return C;
}
