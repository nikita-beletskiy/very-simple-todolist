import { RiFileList2Line } from 'react-icons/ri';
import { BsFileEarmarkCheck } from 'react-icons/bs';
import video from '../../video/video.mp4';
import styles from '../../styles/Homepage.module.css';

const Homepage = () => (
  <>
    <section className={`text-center ${styles.welcome}`}>
      <div className={styles.video_wrapper}>
        <div className={`container py-3 ${styles.welcome_text}`}>
          <h1 className='ml'>Welcome to our Todolist!</h1>
          <p className='s'>
            We are so happy you decided to try our service out!
          </p>
        </div>
        <video autoPlay loop muted>
          <source src={video} type='video/mp4' />
        </video>
      </div>
    </section>

    <section className={`my-2 text-center ${styles.stats}`}>
      <div className='container'>
        <h3>
          Introducing the world's best platform for managing your personal
          doings.
        </h3>
        <br />
        <h3>Simple. Neat. Reliable.</h3>
        <div className={`my-3 ${styles.flexstats}`}>
          <div>
            <RiFileList2Line size='6rem' />
            <p className='l'>2 343 265</p>
            <p className='m-3 m text-secondary'>Todolists</p>
          </div>
          <div>
            <BsFileEarmarkCheck size='6rem' />
            <p className='l'>10 349 405</p>
            <p className='m-3 m text-secondary'>Done</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Homepage;
