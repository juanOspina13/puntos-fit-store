"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import DonateModal from "./DonateModal";

interface DonateButtonProps {
  company: {
    id: string;
    nombre: string;
    slug: string;
  };
  className?: string;
}

export default function DonateButton({ company, className }: DonateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={
          className ??
          "inline-flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-500 hover:text-primary transition-colors duration-200"
        }
      >
        <Heart className="w-3.5 h-3.5" />
        Donar
      </button>

      <DonateModal company={company} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
