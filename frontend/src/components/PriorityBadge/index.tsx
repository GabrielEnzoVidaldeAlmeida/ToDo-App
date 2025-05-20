import clsx from "clsx";

type PriorityBadgeProps = {
  priority: string;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <label
      className={clsx("my-1 rounded w-20 text-center", {
        "bg-red-500": priority === "alta",
        "bg-yellow-500": priority === "média",
        "bg-blue-500": priority === "baixa",
      })}
    >
      {priority}
    </label>
  );
}
