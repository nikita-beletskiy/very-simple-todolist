import video from '../../video/video.mp4';

const Video = () => (
  <video autoPlay loop muted className='mobile-video'>
    <source src={video} type='video/mp4' />
  </video>
);

export default Video;
