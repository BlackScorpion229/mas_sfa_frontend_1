import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { AccentPicker } from '@/components/theme/AccentPicker';
import { useThemeConfig } from '@/components/theme/ThemeContext';
import { CheckCircle, AlertTriangle, XCircle, Star, TrendingUp, Bell } from 'lucide-react';

export default function ThemeDemo() {
  const { mode, resolvedMode, accentId } = useThemeConfig();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 lg:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Theme Demo
            </h1>
            <p className="text-muted-foreground">
              Preview the theme system with different modes and accent colors.
            </p>
          </div>

          {/* Current State */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Current Theme State</CardTitle>
              <CardDescription>Values from useThemeConfig() hook</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 font-mono text-sm">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">mode:</span>{' '}
                  <span className="text-accent-500">{mode}</span>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">resolved:</span>{' '}
                  <span className="text-accent-500">{resolvedMode}</span>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">accent:</span>{' '}
                  <span className="text-accent-500">{accentId}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeToggle />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accent Color</CardTitle>
              </CardHeader>
              <CardContent>
                <AccentPicker />
              </CardContent>
            </Card>
          </div>

          {/* Component Previews */}
          <Card>
            <CardHeader>
              <CardTitle>Component Preview</CardTitle>
              <CardDescription>See how components look with current theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Buttons */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button className="bg-accent-500 hover:bg-accent-600 text-white">Accent</Button>
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge className="bg-accent-500/20 text-accent-500 border-accent-500/30">Accent</Badge>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Status Indicators</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Success</span>
                  </div>
                  <div className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm">Warning</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm">Error</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent-500">
                    <Star className="w-5 h-5" />
                    <span className="text-sm">Accent</span>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Input</h4>
                <div className="max-w-sm">
                  <Input placeholder="Type something..." />
                </div>
              </div>

              {/* Cards Grid */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Card Variants</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card variant="default" className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-500/10">
                        <TrendingUp className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Default</p>
                        <p className="text-xs text-muted-foreground">Standard card</p>
                      </div>
                    </div>
                  </Card>
                  <Card variant="glass" className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-500/10">
                        <Star className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Glass</p>
                        <p className="text-xs text-muted-foreground">Blur effect</p>
                      </div>
                    </div>
                  </Card>
                  <Card variant="gradient" className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-500/10">
                        <Bell className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Gradient</p>
                        <p className="text-xs text-muted-foreground">Subtle blend</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Color Palette Preview */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Accent Palette</h4>
                <div className="flex gap-1">
                  {[50, 100, 200, 300, 400, 500, 600, 700].map((shade) => (
                    <div
                      key={shade}
                      className="flex-1 h-12 rounded-md flex items-end justify-center pb-1"
                      style={{ backgroundColor: `hsl(var(--accent-${shade}))` }}
                    >
                      <span className={`text-xs font-mono ${shade >= 500 ? 'text-white' : 'text-black'}`}>
                        {shade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 rounded-lg bg-secondary/50 overflow-x-auto text-sm font-mono">
{`import { useThemeConfig } from '@/components/theme/ThemeContext';

function MyComponent() {
  const { mode, resolvedMode, accentId, setMode, setAccentId } = useThemeConfig();
  
  return (
    <div>
      <p>Current mode: {mode}</p>
      <p>Resolved: {resolvedMode}</p>
      <p>Accent: {accentId}</p>
      
      <button onClick={() => setMode('dark')}>Dark Mode</button>
      <button onClick={() => setAccentId('emerald')}>Emerald Accent</button>
    </div>
  );
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
