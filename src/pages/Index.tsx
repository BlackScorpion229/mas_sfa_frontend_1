import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndustrySelector } from '@/components/IndustrySelector';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, TrendingUp } from 'lucide-react';

const features = [
  { icon: TrendingUp, label: 'Trend Analysis' },
  { icon: TrendingUp, label: 'Market Insights' },
  { icon: TrendingUp, label: 'Opportunity Scanner' },
];

export default function Index() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!selectedIndustry) return;
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate(`/industry/${encodeURIComponent(selectedIndustry)}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Hero Section - Dark */}
      <div className="lg:w-3/5 bg-[#0a1929] relative overflow-hidden flex flex-col justify-center p-8 lg:p-16 min-h-[60vh] lg:min-h-screen">
        {/* Abstract network background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full" />
          <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-teal-400 rounded-full" />
          <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-teal-400 rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-teal-400 rounded-full" />
          {/* Connection lines effect */}
          <svg className="absolute inset-0 w-full h-full">
            <line x1="25%" y1="25%" x2="50%" y2="33%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
            <line x1="50%" y1="33%" x2="33%" y2="50%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
            <line x1="33%" y1="50%" x2="66%" y2="66%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
            <line x1="66%" y1="66%" x2="25%" y2="75%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Icon */}
          <div className="w-14 h-14 bg-[#1a3a4a] rounded-xl flex items-center justify-center mb-8">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Industry based<br />
            Stock Intelligence<br />
            Engine
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 mb-12 max-w-xl leading-relaxed">
            AI-driven Industry based Stock Analysis in Seconds. Get comprehensive insights into market trends, opportunities and risks.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 text-gray-300 text-sm"
              >
                <feature.icon className="w-4 h-4 text-teal-400" />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Section - Light */}
      <div className="lg:w-2/5 bg-[#f5f5f5] flex items-center justify-center p-8 lg:p-16 min-h-[40vh] lg:min-h-screen">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Start Your Analysis
            </h2>
            <p className="text-gray-600 text-sm">
              Select an industry to generate a comprehensive AI-powered analysis
            </p>
          </div>

          {/* Industry Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <IndustrySelector
              value={selectedIndustry}
              onChange={setSelectedIndustry}
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!selectedIndustry || isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 text-base font-medium rounded-lg"
          >
            {isLoading ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <>
                Show Industry Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Analysis includes market trends, opportunities, and risk assessment
          </p>
        </div>
      </div>
    </div>
  );
}
