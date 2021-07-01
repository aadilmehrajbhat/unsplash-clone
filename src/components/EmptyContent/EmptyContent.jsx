import emptyContent from '@assets/imgs/empty_content.png';

function EmptyContent() {
  return (
    <div className="empty-content">
      <img
        className="empty-content__image"
        src={emptyContent}
        alt="No content found"
      />
    </div>
  );
}

export default EmptyContent;
