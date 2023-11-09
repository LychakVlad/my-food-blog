import { FC } from 'react';
import Feed from '../components/Feed/Feed';
import Image from 'next/image';
import Link from 'next/link';

const Home: FC = () => {
  return (
    <section className="w-full flex-col">
      <div className="relative  max-w-[1300px] overflow-hidden h-[700px] flex items-center rounded-xl">
        <Image
          src={'/assets/images/main.jpeg'}
          width={1200}
          height={600}
          alt="Photo of food"
          className=" absolute object-cover"
        />
        <div className="relative flex flex-col justify-center   text-white bg-slate-900  bg-opacity-30 h-full p-16 ">
          <h1 className="head_text font-inter">
            Cook's Compass
            <br className="max-md:hidden" />
            <span className="">Navigating the Culinary World</span>
          </h1>
          <p className="desc">
            Welcome to Cook's Compass! Navigate the culinary world with ease,
            creating your own recipes and discovering a treasure trove of
            delectable dishes shared by fellow food enthusiasts. Explore,
            create, and celebrate the joy of cooking together!
          </p>
          <Link href={'#recipe-list'} className="nav_btn">
            Let's explore
          </Link>
        </div>
      </div>

      <Feed />
    </section>
  );
};

export default Home;
