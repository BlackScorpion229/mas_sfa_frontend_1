import { useState } from 'react';
import { useThemeConfig } from './ThemeContext';
import { accentPalettes, AccentId, isValidHex } from '@/lib/theme-utils';
import { cn } from '@/lib/utils';
import { Check, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const presetIds = Object.keys(accentPalettes) as Exclude<AccentId, 'custom'>[];

export function AccentPicker() {
  const { accentId, setAccentId, customHex, setCustomHex } = useThemeConfig();
  const [hexInput, setHexInput] = useState(customHex);
  const [showCustom, setShowCustom] = useState(accentId === 'custom');

  const handlePresetSelect = (id: Exclude<AccentId, 'custom'>) => {
    setAccentId(id);
    setShowCustom(false);
  };

  const handleCustomApply = () => {
    if (isValidHex(hexInput)) {
      setCustomHex(hexInput);
      setAccentId('custom');
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Accent Color
      </label>
      
      {/* Preset swatches */}
      <div className="flex flex-wrap gap-2">
        {presetIds.map((id) => {
          const palette = accentPalettes[id];
          const isSelected = accentId === id;
          
          return (
            <button
              key={id}
              onClick={() => handlePresetSelect(id)}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                'transition-all duration-200 ring-offset-background',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isSelected && 'ring-2 ring-offset-2'
              )}
              style={{ 
                backgroundColor: palette.hex,
                '--tw-ring-color': palette.hex,
              } as React.CSSProperties}
              title={palette.name}
              aria-pressed={isSelected}
              aria-label={`Select ${palette.name} accent color`}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </button>
          );
        })}
        
        {/* Custom toggle */}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            'border-2 border-dashed border-border',
            'transition-all duration-200',
            'hover:border-primary/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            accentId === 'custom' && 'ring-2 ring-offset-2 ring-primary'
          )}
          title="Custom color"
          aria-label="Use custom accent color"
        >
          <Palette className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Custom hex input */}
      {showCustom && (
        <div className="flex gap-2 items-center animate-fade-in">
          <div 
            className="w-8 h-8 rounded-md border border-border flex-shrink-0"
            style={{ backgroundColor: isValidHex(hexInput) ? hexInput : '#888' }}
          />
          <Input
            type="text"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            placeholder="#2563eb"
            className="font-mono text-sm h-8"
            maxLength={7}
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCustomApply}
            disabled={!isValidHex(hexInput)}
            className="h-8"
          >
            Apply
          </Button>
        </div>
      )}

      {/* Preview */}
      <div className="pt-2 space-y-2">
        <span className="text-xs text-muted-foreground">Preview</span>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" className="bg-accent-500 hover:bg-accent-600 text-white">
            Button
          </Button>
          <Badge className="bg-accent-500/20 text-accent-500 border-accent-500/30">
            Badge
          </Badge>
          <a href="#" className="text-sm text-accent-500 hover:text-accent-600 underline">
            Link
          </a>
        </div>
      </div>
    </div>
  );
}
