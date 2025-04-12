import { useState } from "react";
import { BasicTableColumn } from "../models/table";
import { UserType } from "../models/table";
import { BasicTable } from "./templates";

export default function Test() {
  const [data, setData] = useState<UserType[]>([
    { id: 1, name: "علی", email: "ali@gmail.com", age: 28 },
    { id: 2, name: "محمد", email: "mohammad@gmail.com", age: 32 },
    { id: 3, name: "زهرا", email: "zahra@gmail.com", age: 24 },
  ]);

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (row: UserType) => {
    const newName = prompt("اسم جدید:", row.name);
    if (newName) {
      setData((prev) =>
        prev.map((item) =>
          item.id === row.id ? { ...item, name: newName } : item
        )
      );
    }
  };

  const handleAdd = () => {
    const name = prompt("اسم کاربر:");
    const email = prompt("ایمیل کاربر:");
    const age = prompt("سن کاربر:");

    if (name && email && age) {
      const nextId =
        data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;

      const newUser: UserType = {
        id: nextId,
        name,
        email,
        age: Number(age),
      };
      setData((prev) => [...prev, newUser]);
    }
  };

  const columns: BasicTableColumn<UserType>[] = [
    {
      name: "id",
      header: "شماره",
      render: (row) => row.id,
    },
    {
      name: "name",
      header: "نام",
      render: (row) => row.name,
    },
    {
      name: "email",
      header: "ایمیل",
      render: (row) => row.email,
    },
    {
      name: "age",
      header: "سن",
      render: (row) => row.age,
    },
    {
      name: "actions",
      header: "عملیات",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            ویرایش
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            حذف
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="p-10 space-y-4 bg-gray-600 min-h-screen flex flex-col">
      <div>
        <BasicTable columns={columns} data={data} rowKey="id" />
      </div>

      <div className="flex justify-center pt-5">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
        >
          افزودن کاربر +
        </button>
      </div>
    </div>
  );
}
