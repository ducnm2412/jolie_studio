"use server";

export type BookingState = { ok: boolean; message: string } | null;

export async function submitBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/\s/g, "");

  if (!name) return { ok: false, message: "Vui lòng nhập họ tên." };
  if (!/^(\+?84|0)\d{9,10}$/.test(phone)) return { ok: false, message: "Số điện thoại chưa hợp lệ." };

  // TODO: gửi lịch hẹn về email / Google Sheet / Zalo OA của studio
  console.log("[booking]", Object.fromEntries(formData));

  return { ok: true, message: "Cảm ơn bạn! Jolie Studio sẽ liên hệ xác nhận lịch trong thời gian sớm nhất." };
}
