import { getTasks } from "@/db/queries";
import { addTask, removeTask, markDone } from "./actions";

export default async function Home() {
  const tasks = await getTasks();

  const inProgress = tasks.filter((t) => t.status !== "Выполнено");
  const completed = tasks.filter((t) => t.status === "Выполнено");

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Мои задачи</h1>
        </div>

        <form
          action={addTask}
          className="bg-white rounded-xl shadow-sm p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-3"
        >
          <input
            name="title"
            placeholder="Название задачи"
            required
            className="md:col-span-2 border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="assignee"
            placeholder="Исполнитель"
            className="border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="dueDate"
            type="date"
            className="border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition"
          >
            + Добавить
          </button>
        </form>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Задача</div>
            <div className="col-span-3">Исполнитель</div>
            <div className="col-span-2">Срок</div>
            <div className="col-span-2">Статус</div>
            <div className="col-span-1">Прогресс</div>
          </div>

          <GroupHeader title="В работе" count={inProgress.length} />
          {inProgress.length === 0 ? (
            <EmptyRow text="Нет активных задач" />
          ) : (
            inProgress.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))
          )}

          <GroupHeader title="Выполнено" count={completed.length} />
          {completed.length === 0 ? (
            <EmptyRow text="Пока ничего не выполнено" />
          ) : (
            completed.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function GroupHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="px-6 py-3 bg-gray-100 border-t border-b text-sm font-semibold text-gray-700">
      {title} <span className="text-gray-400 font-normal ml-2">({count})</span>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="px-6 py-4 text-sm text-gray-400">{text}</div>
  );
}

function TaskRow({ task }: { task: any }) {
  const initials = (task.assignee || "?").split(" ").map((s: string) => s[0]).join("").slice(0, 2);

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b items-center hover:bg-gray-50 transition">
      <div className="col-span-4 flex items-center gap-2">
        <span className={`text-sm ${task.status === "Выполнено" ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.title}
        </span>
      </div>

      <div className="col-span-3">
        <span className="text-sm text-gray-700">{task.assignee || "—"}</span>
      </div>

      <div className="col-span-2 text-sm text-gray-600">
        {task.dueDate || "—"}
      </div>

      <div className="col-span-2">
        <span
          className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
            task.status === "Выполнено"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="col-span-1 flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${task.progress || 0}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">{task.progress || 0}%</span>
      </div>

      <div className="col-span-12 flex gap-2 mt-2">
        <form action={markDone}>
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="status" value={task.status} />
          <button
            className={`text-xs px-2 py-1 rounded ${
              task.status === "Выполнено"
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {task.status === "Выполнено" ? "Вернуть" : "Готово"}
          </button>
        </form>

        <form action={removeTask}>
          <input type="hidden" name="id" value={task.id} />
          <button className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700">
            Удалить
          </button>
        </form>
      </div>
    </div>
  );
}