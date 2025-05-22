import { BadgeCheckIcon } from "lucide-react";

type StatusIconProps = {
  done: boolean;
};

export function StatusIcon({ done }: StatusIconProps) {
  return (
    <p>
      {done ? (
        <BadgeCheckIcon className="fill-green-500 cursor-pointer hover:scale-105 transition" />
      ) : (
        <BadgeCheckIcon className="cursor-pointer hover:scale-105 transition" />
      )}
    </p>
  );
}
