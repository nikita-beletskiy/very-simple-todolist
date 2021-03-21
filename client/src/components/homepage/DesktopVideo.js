import video from '../../video/desktop-video.mp4';

const Video = () => (
  <video autoPlay loop muted className='desktop-video'>
    <source src={video} type='video/mp4' />
  </video>
);

export default Video;
