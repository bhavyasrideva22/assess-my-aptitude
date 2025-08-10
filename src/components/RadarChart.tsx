import { useEffect, useRef } from 'react';

interface RadarChartProps {
  data: {
    label: string;
    value: number; // 0-100
  }[];
  className?: string;
}

export const RadarChart = ({ data, className }: RadarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 280;
    const center = size / 2;
    const radius = 100;

    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(center, center, (radius / 5) * i, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw axes
    const angleStep = (2 * Math.PI) / data.length;
    
    data.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // Draw data polygon
    ctx.strokeStyle = '#3b82f6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    data.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (item.value / 100) * radius;
      const x = center + Math.cos(angle) * distance;
      const y = center + Math.sin(angle) * distance;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    data.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const labelDistance = radius + 25;
      const x = center + Math.cos(angle) * labelDistance;
      const y = center + Math.sin(angle) * labelDistance;
      
      ctx.fillText(item.label, x, y + 4);
    });

  }, [data]);

  return (
    <div className={className}>
      <canvas 
        ref={canvasRef} 
        className="max-w-full h-auto border rounded-lg shadow-sm bg-white"
      />
    </div>
  );
};