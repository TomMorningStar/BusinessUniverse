import type { ComponentType } from 'react';
import { PotatoIcon } from '../../icons/PotatoIcon/PotatoIcon';
import { ChipsBagIcon } from '../../icons/ChipsBagIcon/ChipsBagIcon';

type CustomIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
};

const CUSTOM_ICONS: Record<string, ComponentType<CustomIconProps>> = {
  '🥔': PotatoIcon,
  '🍟': ChipsBagIcon,
};

type EmojiIconProps = {
  emoji: string;
  size?: number;
  animated?: boolean;
  className?: string;
};

export function EmojiIcon({ emoji, size = 22, animated = false, className }: EmojiIconProps) {
  const CustomIcon = CUSTOM_ICONS[emoji];

  if (CustomIcon) {
    return <CustomIcon size={size} animated={animated} className={className} />;
  }

  return (
    <span className={className} aria-hidden="true">
      {emoji}
    </span>
  );
}
