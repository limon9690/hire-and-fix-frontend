"use client";

import { useEffect, useRef, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

type ModeToggleProps = {
  align?: "start" | "end";
};

export function ModeToggle({ align = "end" }: ModeToggleProps) {
  const { theme = "system", setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) {
        return;
      }
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Theme options"
        title="Theme options"
      >
        <Sun className="size-4" />
        <span className="sr-only">Theme options</span>
      </Button>
    );
  }

  const currentTheme =
    theme === "light" || theme === "dark" ? theme : "system";
  const label =
    currentTheme === "light"
      ? "Light mode"
      : currentTheme === "dark"
        ? "Dark mode"
        : "System mode";

  const icon =
    currentTheme === "light" ? (
      <Sun className="size-4" />
    ) : currentTheme === "dark" ? (
      <Moon className="size-4" />
    ) : (
      <Laptop className="size-4" />
    );

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Theme options, currently ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        title={`Theme: ${label}`}
      >
        {icon}
        <span className="sr-only">Theme options</span>
      </Button>

      {open ? (
        <div
          role="menu"
          className={`absolute z-50 mt-2 w-36 max-w-[calc(100vw-1rem)] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md ${
            align === "start" ? "left-0" : "right-0"
          }`}
        >
          <button
            type="button"
            className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
          >
            Light
          </button>
          <button
            type="button"
            className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
          >
            Dark
          </button>
          <button
            type="button"
            className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
          >
            System
          </button>
        </div>
      ) : null}
    </div>
  );
}
