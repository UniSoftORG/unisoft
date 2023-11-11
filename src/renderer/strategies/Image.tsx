import Image from 'next/image';
import { handleEvents } from '@/utils/Renderer/events';

const ImageRenderer: React.FC<any> = ({ children, componentData, events }) => {
  return (
    <Image
      src={
        componentData?.elementAttributes?.src ??
        componentData.passAttributes.image
      }
      alt={componentData.elementAttributes.alt ?? ''}
      width={componentData.elementAttributes.width}
      height={componentData.elementAttributes.height}
      className={componentData.elementAttributes.className}
      loading={'eager'}
      priority
      {...handleEvents(componentData, { customPrefix: 'executeOn' })}
    />
  );
};

export default ImageRenderer;
