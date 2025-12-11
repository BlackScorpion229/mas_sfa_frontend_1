import { useThemeConfig } from './ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { AccentPicker } from './AccentPicker';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Palette, RotateCcw } from 'lucide-react';

export function ThemeMenu() {
  const { resetToDefaults } = useThemeConfig();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Open theme settings"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-4 bg-popover border-border" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Appearance</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetToDefaults}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
          
          <ThemeToggle />
          <AccentPicker />
        </div>
      </PopoverContent>
    </Popover>
  );
}
