// src/components/CircularText.tsx

import styled from 'styled-components';
import CircularText from './reactbits/src/components/reactbits/TextAnimations/CircularText/CircularText';

const BLUE_COLOR = '#1404FB';

interface CircularTextCustomProps {
  text: string;
  spinDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

// Styled wrapper to force color on all spans inside .circular-text
const BlueCircularTextWrapper = styled.div<{ color: string }>`
  width: 300px;
  height: 300px;
  .circular-text span {
    color: ${({ color }) => color} !important;
  }
`;

export default function CircularTextCustom({
  text,
  spinDuration = 20,
  className,
  style,
  color = BLUE_COLOR,
}: CircularTextCustomProps) {
  return (
    <BlueCircularTextWrapper color={color} style={style} className={className}>
      <CircularText
        text={text}
        spinDuration={spinDuration}
        onHover='goBonkers'
      />
    </BlueCircularTextWrapper>
  );
}