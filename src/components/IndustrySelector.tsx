import { useState, useMemo } from 'react';
import { Search, ChevronDown, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { industries } from '@/data/mockData';

interface IndustrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndustries = useMemo(() => {
    if (!searchQuery) return industries;
    return industries.filter((industry) =>
      industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelect = (industry: string) => {
    onChange(industry);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-3.5",
          "bg-secondary border border-border rounded-xl",
          "text-left transition-all duration-200",
          "hover:border-primary/50 hover:bg-secondary/80",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          isOpen && "border-primary ring-2 ring-primary/20"
        )}
      >
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-primary" />
          <span className={cn(
            "text-base",
            value ? "text-foreground" : "text-muted-foreground"
          )}>
            {value || 'Select an industry...'}
          </span>
        </div>
        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute z-50 w-full mt-2",
          "bg-popover border border-border rounded-xl shadow-xl",
          "animate-fade-in overflow-hidden"
        )}>
          {/* Search Input */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5",
                  "bg-secondary/50 border border-border rounded-lg",
                  "text-sm text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                  "transition-all duration-200"
                )}
                autoFocus
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto py-2">
            {filteredIndustries.length > 0 ? (
              filteredIndustries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleSelect(industry)}
                  className={cn(
                    "w-full px-4 py-3 text-left",
                    "flex items-center gap-3",
                    "text-sm transition-colors duration-150",
                    "hover:bg-secondary",
                    value === industry && "bg-primary/10 text-primary"
                  )}
                >
                  <Building2 className={cn(
                    "w-4 h-4",
                    value === industry ? "text-primary" : "text-muted-foreground"
                  )} />
                  {industry}
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No industries found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
