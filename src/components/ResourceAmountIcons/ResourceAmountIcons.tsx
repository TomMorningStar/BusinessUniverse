import { RESOURCES } from '../../domain/resources';
import type { ResourceAmount } from '../../domain/types';
import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import './ResourceAmountIcons.css';

const MAX_ICONS_PER_RESOURCE = 8;

type ResourceAmountIconsProps = {
  amounts: readonly ResourceAmount[];
  size?: number;
};

export function ResourceAmountIcons({ amounts, size = 16 }: ResourceAmountIconsProps) {
  return (
    <>
      {amounts.map((resourceAmount) => {
        const resourceConfig = RESOURCES[resourceAmount.resourceId];
        const iconCount = Math.min(resourceAmount.amount, MAX_ICONS_PER_RESOURCE);
        const overflowCount = resourceAmount.amount - iconCount;

        return (
          <span key={resourceAmount.resourceId} className="resource-amount-icons">
            {Array.from({ length: iconCount }, (_, index) => (
              <EmojiIcon
                key={index}
                emoji={resourceConfig.emoji}
                size={size}
                animated
                className="resource-amount-icons__icon"
              />
            ))}
            {overflowCount > 0 && (
              <span className="resource-amount-icons__overflow">+{overflowCount}</span>
            )}
          </span>
        );
      })}
    </>
  );
}
