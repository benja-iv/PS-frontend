import React from 'react';
import { Button } from '../atoms/Button';

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="quantity-selector" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button label="-" onClick={onDecrease} disabled={quantity <= 1} variant="secondary" />
      <span>{quantity}</span>
      <Button label="+" onClick={onIncrease} variant="secondary" />
    </div>
  );
};