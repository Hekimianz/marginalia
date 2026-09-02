"use client";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordToggleProps {
  registration: UseFormRegisterReturn;
  error?: string;
}

export default function PasswordToggle({
  registration,
  error,
}: PasswordToggleProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField className="w-full" name="password">
      <Label>Password</Label>
      <InputGroup className="shadow-none flex mt-1 items-center rounded-xs bg-card border-2 border-border focus-within:ring-2 focus-within:ring-accent focus-within:border-transparent">
        <InputGroup.Input
          className="w-full bg-transparent border-0 px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-0 "
          type={isVisible ? "text" : "password"}
          placeholder={isVisible ? "OneMustImagine1913" : "******************"}
          {...registration}
        />
        <InputGroup.Suffix className="pr-2 pl-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            className="text-muted hover:text-foreground bg-transparent hover:bg-accent/10 focus:outline-none focus:ring-accent"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <Eye className="size-4" />
            ) : (
              <EyeSlash className="size-4" />
            )}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      {error && <span className="text-accent text-sm">{error}</span>}
    </TextField>
  );
}
