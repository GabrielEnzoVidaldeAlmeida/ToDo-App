import clsx from "clsx";

type PriorityBadgeProps = {
  priority: string;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <label
      className={clsx(" rounded w-20 text-center", {
        //TODO: ajustar (alta = Urgente | média = Normal | baixa = Eventual)
        "bg-red-300 border-2 border-red-400 text-sm": priority === "alta",
        "bg-yellow-300 border-2 border-yellow-400 text-sm":
          priority === "média",
        "bg-blue-300 border-2 border-blue-400 text-sm": priority === "baixa",
      })}
    >
      {priority}
    </label>
  );
}
