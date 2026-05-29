"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";

interface NominatimResult {
  place_id: number;
  display_name: string;
  address: {
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function AddressAutocomplete({
  value,
  onChange,
  disabled,
}: AddressAutocompleteProps) {
  const [query, setQuery] = React.useState<string>(value || "");
  const [prevValue, setPrevValue] = React.useState<string>(value || "");
  const [suggestions, setSuggestions] = React.useState<NominatimResult[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  /**
   * THE FIX: Adjusting state during rendering.
   * This is the React-recommended pattern for syncing props to state
   * without triggering cascading renders via useEffect.
   */
  if (value !== prevValue) {
    setPrevValue(value || "");
    setQuery(value || "");
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API Search
  React.useEffect(() => {
    const searchAddress = async () => {
      // Early exit if query is too short or matches current value
      if (query.length < 3 || query === value) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        // OpenStreetMap's free geocoding API (Nominatim)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5&countrycodes=us`,
          {
            headers: {
              "User-Agent": "ABBA-Intake-Form/1.0",
            },
          },
        );

        if (!res.ok) throw new Error("Search failed");

        const data = (await res.json()) as NominatimResult[];
        setSuggestions(data);
        setIsOpen(data.length > 0);
      } catch (error) {
        console.error("Error fetching address:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      searchAddress();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [query, value]);

  const handleSelect = (suggestion: NominatimResult) => {
    const formattedAddress = suggestion.display_name;
    setQuery(formattedAddress);
    onChange(formattedAddress);
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => {
            const newValue = e.target.value;
            setQuery(newValue);
            if (newValue === "") {
              onChange("");
              setSuggestions([]);
              setIsOpen(false);
            }
          }}
          disabled={disabled}
          placeholder="Start typing an address..."
          className="pr-10"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-gray-400" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-60">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="flex items-start gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 text-gray-700 border-b border-gray-100 last:border-0"
            >
              <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
              <span>{suggestion.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
