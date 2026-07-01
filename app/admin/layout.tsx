import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Double-check server-side — middleware is the first line of defence,
  // this is the second so even a misconfigured middleware can't leak the UI.
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <AdminNav />
      <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
    </div>
  );
}
