"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface CollectionType {
  _id: string;
  title: string;
}

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections = [],
  value = [],
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const selected = value
    .map((id) => collections.find((collection) => collection._id === id))
    .filter(
      (collection): collection is CollectionType => collection !== undefined
    );

  const selectable = collections.filter(
    (collection) => !value.includes(collection._id)
  );

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge
            key={collection._id}
            className="bg-grey-2 text-black hover:bg-gray-400"
          >
            {collection.title}
            <button
              type="button"
              className="ml-1 rounded-full outline-none hover:bg-grey-2 hover:text-black"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <div className="absolute z-10 w-full bg-white rounded-md shadow-md">
            <CommandList>
              {selectable.map((collection) => (
                <CommandItem
                  key={collection._id}
                  className="py-2 px-3 hover:bg-grey-2 cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => {
                    onChange(collection._id);
                    setInputValue("");
                  }}
                >
                  {collection.title}
                </CommandItem>
              ))}
            </CommandList>
          </div>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
