"use client";

import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) return <div className="h-10 w-16" />;

  const isDark = theme === "dark";

  return (
    <Switch
      size="lg"
      isSelected={isDark}
      onChange={(isSelected: boolean) =>
        setTheme(isSelected ? "dark" : "light")
      }
    >
      <Switch.Content>
        <Switch.Control className="bg-muted">
          <Switch.Thumb className="bg-background">
            <Switch.Icon>
              {isDark ? (
                <Sun className="size-3 text-accent  opacity-100" />
              ) : (
                <Moon className="size-3 text-accent opacity-70" />
              )}
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}
