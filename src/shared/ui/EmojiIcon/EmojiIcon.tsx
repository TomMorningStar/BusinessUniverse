import type { ComponentType, CSSProperties } from 'react';
import { PotatoIcon } from '../icons/PotatoIcon/PotatoIcon';
import { ChipsBagIcon } from '../icons/ChipsBagIcon/ChipsBagIcon';
import { BoxIcon } from '../icons/BoxIcon/BoxIcon';
import { WheatIcon } from '../icons/WheatIcon/WheatIcon';
import { FactoryIcon } from '../icons/FactoryIcon/FactoryIcon';
import { OrangeIcon } from '../icons/OrangeIcon/OrangeIcon';
import { GearIcon } from '../icons/GearIcon/GearIcon';
import { LogIcon } from '../icons/LogIcon/LogIcon';

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
  '🍊': OrangeIcon,
  '⚙️': GearIcon,
  '🪵': LogIcon,
};

type EmojiIconProps = {
  emoji: string;
  size?: number;
  animated?: boolean;
  className?: string;
};

export function EmojiIcon({ emoji, size, animated = false, className }: EmojiIconProps) {
  const CustomIcon = CUSTOM_ICONS[emoji];

  if (CustomIcon) {
    // size omitted -> the icon inherits --icon-size from its container (card/sidebar).
    return <CustomIcon size={size} animated={animated} className={className} />;
  }

  const style = size === undefined ? undefined : ({ fontSize: `${size}px` } as CSSProperties);

  return (
    <span className={className} style={style} aria-hidden="true">
      {emoji}
    </span>
  );
}
