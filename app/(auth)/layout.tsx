"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = document.cookie.includes("auth-token");
    if (!token) {
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return null;
  }

  return children;
}
