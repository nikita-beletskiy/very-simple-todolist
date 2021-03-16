import { RiFileList2Line } from 'react-icons/ri';
import { BsFileEarmarkCheck } from 'react-icons/bs';
import { BiHappyBeaming } from 'react-icons/bi';
import video from '../../video/video.mp4';

const Homepage = () => (
  <>
    <section className='welcome text-center'>
      <div className='welcome__wrapper'>
        <div className='welcome__text container'>
          <h1>Welcome to our Todolist!</h1>
          <p>We are so happy you decided to try our service out!</p>
        </div>
        <video autoPlay loop muted>
          <source src={video} type='video/mp4' />
        </video>
      </div>
    </section>

    <section className='stats'>
      <div className='container'>
        <h3>
          Introducing the world's best platform for managing your personal
          doings.
        </h3>
        <br />
        <h3>Simple. Neat. Reliable.</h3>
        <div className='stats__flex'>
          <div>
            <RiFileList2Line size='6rem' />
            <p>2 343 265</p>
            <p>Todolists</p>
          </div>
          <div>
            <BsFileEarmarkCheck size='6rem' />
            <p>10 349 405</p>
            <p>Done</p>
          </div>
          <div>
            <BiHappyBeaming size='6rem' />
            <p>2 574 456</p>
            <p>Happy Users</p>
          </div>
        </div>
      </div>
    </section>

    <section className='prod'>
      <div>Unleash your potential with us!</div>
    </section>

    <footer>&copy; Copyrignt 2021</footer>
  </>
);

export default Homepage;
