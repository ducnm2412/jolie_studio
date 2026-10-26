"use client";

import { useActionState } from "react";
import { submitBooking } from "@/app/actions";
import { packages, services } from "@/data/site";

const field =
  "w-full border-b border-paper/25 bg-transparent py-3 text-paper placeholder:text-paper/40 focus:border-paper focus:outline-none";

export default function BookingForm() {
  const [state, action, pending] = useActionState(submitBooking, null);

  if (state?.ok) {
    return <p className="font-serif text-2xl italic text-paper">{state.message}</p>;
  }

  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2">
      <input name="name" placeholder="Họ và tên *" required className={field} />
      <input name="phone" type="tel" placeholder="Số điện thoại / Zalo *" required className={field} />
      <select name="service" defaultValue="" className={`${field} [&>option]:text-ink`}>
        <option value="" disabled>
          Dịch vụ quan tâm
        </option>
        {services.map((s) => (
          <option key={s.title}>{s.title}</option>
        ))}
      </select>
      <select name="package" defaultValue="" className={`${field} [&>option]:text-ink`}>
        <option value="" disabled>
          Gói chụp
        </option>
        {packages.map((p) => (
          <option key={p.name}>{p.name}</option>
        ))}
      </select>
      <input name="date" type="date" className={`${field} [color-scheme:dark]`} />
      <input name="time" type="time" className={`${field} [color-scheme:dark]`} />
      <textarea name="note" rows={3} placeholder="Ý tưởng / ghi chú thêm" className={`${field} sm:col-span-2`} />
      {state && !state.ok && <p className="text-sm text-red-300 sm:col-span-2">{state.message}</p>}
      <button
        disabled={pending}
        className="justify-self-start bg-paper px-10 py-4 text-sm tracking-[0.2em] text-ink uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {pending ? "Đang gửi..." : "Đăng ký lịch chụp"}
      </button>
    </form>
  );
}
