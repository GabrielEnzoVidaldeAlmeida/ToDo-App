import { BadgeCheckIcon, BadgeXIcon } from "lucide-react";

type StatusIconProps = {
  done: boolean;
};

export function StatusIcon({ done }: StatusIconProps) {
  return (
    <p>
      {done ? (
        <BadgeCheckIcon className="fill-green-500" />
      ) : (
        <BadgeXIcon className="fill-red-500" />
      )}
    </p>
  );
}
