export const CustomVideoIFrame = ({ title, videoId, currentWindowWidth }) => {
  return (
    <iframe
      clasName="video-card__iframe border-radius--sm "
      title={`${title}`}
      width={
        window.innerWidth > 800
          ? `${currentWindowWidth - 450}`
          : `${currentWindowWidth - 100}`
      }
      height={
        window.innerWidth > 800
          ? `${(currentWindowWidth - 450) / 1.78}`
          : `${(currentWindowWidth - 100) / 1.78}`
      }
      src={`https://www.youtube.com/embed/${videoId}`}
      style={{ borderRadius: '10px' }}
    />
  );
};
