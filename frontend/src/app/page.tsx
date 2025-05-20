import { taskRepository } from "@/repositories/task";
import clsx from "clsx";
import { BadgeCheck, BadgeX } from "lucide-react";

export default async function HomePage() {
  const tasks = await taskRepository.findAll();

  return (
    <div className="px-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
        Olá, Gabriel Enzo
      </h1>
      <ul className="list-none">
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="mt-2 border-2  rounded-2xl">
              <h2 className="px-4 border-b-2 text-xl">
                {task.title} - 19/05/2025
              </h2>
              <p className="px-4">{task.content}</p>

              <div className="flex items-center justify-between pt-1 pb-1 px-4 rounded-b-2xl bg-gray-300">
                <div className="flex gap-1">
                  <p className="my-1 ">Prioridade:</p>
                  <label
                    className={clsx("my-1 rounded w-20 text-center", {
                      "bg-red-500": task.priority === "alta",
                      "bg-yellow-500": task.priority === "média",
                      "bg-blue-500": task.priority === "baixa",
                    })}
                  >
                    {task.priority}
                  </label>
                </div>

                <div>
                  <p>
                    {task.done ? (
                      <BadgeCheck className="fill-green-500" />
                    ) : (
                      <BadgeX className="fill-red-500" />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
