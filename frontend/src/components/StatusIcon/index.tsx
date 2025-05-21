import { BadgeCheckIcon } from "lucide-react";

type StatusIconProps = {
  done: boolean;
};

export function StatusIcon({ done }: StatusIconProps) {
  return (
    <p>
      {done ? (
        <BadgeCheckIcon className="fill-green-500 cursor-pointer" />
      ) : (
        <BadgeCheckIcon className="cursor-pointer" />
      )}
    </p>
  );
}
