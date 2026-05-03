import { Database } from "lucide-react";
import { sqlSchema } from "@/lib/temple-data";

export const SchemaViewer = () => (
  <details className="group rounded-2xl border border-border bg-card shadow-soft">
    <summary className="flex cursor-pointer items-center gap-3 px-6 py-4 font-display font-semibold text-maroon">
      <Database className="h-5 w-5 text-saffron" />
      Database Schema (SQL DDL)
      <span className="ml-auto text-xs text-muted-foreground group-open:hidden">click to expand</span>
    </summary>
    <pre className="overflow-x-auto border-t border-border bg-muted/40 p-5 text-xs leading-relaxed text-foreground">
      <code>{sqlSchema}</code>
    </pre>
  </details>
);
