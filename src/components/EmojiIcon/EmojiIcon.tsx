import type { ComponentType } from 'react';
import { PotatoIcon } from '../../icons/PotatoIcon/PotatoIcon';
import { ChipsBagIcon } from '../../icons/ChipsBagIcon/ChipsBagIcon';
import { BoxIcon } from '../../icons/BoxIcon/BoxIcon';
import { WheatIcon } from '../../icons/WheatIcon/WheatIcon';
import { FactoryIcon } from '../../icons/FactoryIcon/FactoryIcon';

type CustomIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
};

const CUSTOM_ICONS: Record<string, ComponentType<CustomIconProps>> = {
  '🥔': PotatoIcon,
  '🍟': ChipsBagIcon,
  '📦': BoxIcon,
  '🌾': WheatIcon,
  '🏭': FactoryIcon,
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
