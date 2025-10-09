
import { cn } from "@/lib/utils";

interface PriceProps {
  originalPrice: string;
  price: string;
  priceAlternative?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Price({ originalPrice, price, priceAlternative, className, size = 'md' }: PriceProps) {
  const sizeClasses = {
    sm: {
      original: 'text-sm',
      current: 'text-lg font-bold',
      alternative: 'text-sm'
    },
    md: {
      original: 'text-base',
      current: 'text-2xl font-extrabold',
      alternative: 'text-base'
    },
    lg: {
      original: 'text-lg',
      current: 'text-3xl lg:text-4xl font-extrabold',
      alternative: 'text-lg'
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">DE</span>
        <span className={cn("line-through text-gray-400", sizeClasses[size].original)}>
          {originalPrice}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white">POR APENAS</span>
        <span className={cn("text-workshop-accent", sizeClasses[size].current)}>
          {price}
        </span>
      </div>
      {priceAlternative && (
        <div className="text-center">
          <span className="text-gray-300">ou </span>
          <span className={cn("text-workshop-accent", sizeClasses[size].alternative)}>
            {priceAlternative}
          </span>
        </div>
      )}
    </div>
  );
}
