"use client";

import * as React from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { NewExpressionForm } from "@/components/NewExpressionForm";

export default function NewExpressionPage() {
  return (
    <AppShell>
      <TopBar title="새 표현 추가" back />
      <NewExpressionForm />
    </AppShell>
  );
}
