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

        if (resourceAmount.amount > MAX_ICONS_PER_RESOURCE) {
          return (
            <span key={resourceAmount.resourceId} className="resource-amount-icons">
              <EmojiIcon
                emoji={resourceConfig.emoji}
                size={size}
                animated={false}
                className="resource-amount-icons__icon"
              />
              <span className="resource-amount-icons__multiplier">×{resourceAmount.amount}</span>
            </span>
          );
        }

        return (
          <span key={resourceAmount.resourceId} className="resource-amount-icons">
            {Array.from({ length: resourceAmount.amount }, (_, index) => (
              <EmojiIcon
                key={index}
                emoji={resourceConfig.emoji}
                size={size}
                animated={false}
                className="resource-amount-icons__icon"
              />
            ))}
          </span>
        );
      })}
    </>
  );
}
