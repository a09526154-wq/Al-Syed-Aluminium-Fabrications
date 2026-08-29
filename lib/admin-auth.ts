import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAdminSession() {
  try {
    const sessionData = await auth.api.getSession({
      headers: await headers(),
    });
    return sessionData;
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
}

export async function requireAdminOrStaff() {
  const sessionData = await getAdminSession();
  if (!sessionData || !sessionData.user) {
    return { error: "Unauthorized. Please sign in.", status: 401, session: null, user: null };
  }
  return { error: null, session: sessionData.session, user: sessionData.user };
}

export async function requireAdminRole() {
  const check = await requireAdminOrStaff();
  if (check.error) return check;

  if (check.user?.role !== "admin") {
    return {
      error: "Forbidden. Admin privileges required for this action.",
      status: 403,
      session: check.session,
      user: check.user,
    };
  }

  return check;
}
