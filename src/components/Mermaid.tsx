import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
});

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.contentLoaded();
      const renderChart = async () => {
        try {
          // Clear previous content
          ref.current!.innerHTML = '';
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid rendering failed:', error);
          if (ref.current) {
            ref.current.innerHTML = '<pre class="text-red-500 p-4 bg-red-500/10 rounded-lg border border-red-500/20">Failed to render diagram</pre>';
          }
        }
      };
      renderChart();
    }
  }, [chart]);

  return (
    <div className="mermaid-container my-8 flex justify-center overflow-x-auto bg-white/5 p-8 rounded-3xl border border-white/10">
      <div ref={ref} />
    </div>
  );
};

export default Mermaid;
