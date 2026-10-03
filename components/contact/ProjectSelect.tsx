"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

const OPTIONS = [
  { value: "terrasse-bois", label: "Terrasse en bois" },
  { value: "sur-pilotis", label: "Terrasse sur pilotis" },
  { value: "pergola", label: "Pergola / Abri voiture" },
  { value: "piscine", label: "Terrasse piscine" },
  { value: "amenagement", label: "Aménagement extérieur" },
  { value: "autre", label: "Autre" },
];

const fieldClass =
  "w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors";

export default function ProjectSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const selected = OPTIONS.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const choose = (next: string) => {
    setValue(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const moveActive = (direction: 1 | -1) => {
    setActive((index) => {
      if (!open) {
        const current = OPTIONS.findIndex((option) => option.value === value);
        return current >= 0 ? current : 0;
      }
      return (index + direction + OPTIONS.length) % OPTIONS.length;
    });
    setOpen(true);
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      choose(OPTIONS[active].value);
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % OPTIONS.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + OPTIONS.length) % OPTIONS.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(OPTIONS.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(OPTIONS[active].value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name="projet" value={value} />
      <button
        ref={buttonRef}
        id="projet"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={onButtonKeyDown}
        className={`${fieldClass} flex items-center justify-between gap-3 text-left ${
          selected ? "" : "text-noir-bois/50"
        }`}
      >
        <span>{selected?.label ?? "Sélectionnez…"}</span>
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 shrink-0 border-b border-r border-current transition-transform ${
            open ? "-translate-y-px rotate-[225deg]" : "translate-y-px rotate-45"
          }`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Type de projet"
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className="absolute z-20 mt-1 w-full border border-beige-card bg-white py-1 shadow-lg"
        >
          {OPTIONS.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === active;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(option.value)}
                  className={`w-full px-4 py-2.5 text-left text-noir-bois transition-colors ${
                    isSelected ? "bg-beige text-brun" : ""
                  } ${isActive && !isSelected ? "bg-beige" : ""}`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
