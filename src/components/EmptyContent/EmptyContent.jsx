import Image from 'next/image';
import emptyContent from '@assets/imgs/empty_content.png';

function EmptyContent() {
  return (
    <div className="empty-content">
      <Image
        src={emptyContent}
        alt="No content found"
        width={350}
        height={262.5}
      ></Image>
    </div>
  );
}

export default EmptyContent;
