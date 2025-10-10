
import IMAGES from "../../assets";

export default function Hero() {
 
  return (
    <div className="flex flex-col justify-between gap-12 md:flex-row md:pl-12 lg:pl-24 lg:gap-0 lg:items-center">
      <div className="w-full flex flex-col justify-between gap-6 px-4 md:px-0 md:justify-start">
        <h1 className="text-5xl lg:text-6xl leading-tight lg:leading-[100px] font-bold text-hero-heading">
          Best place to shop for all your{" "}
          <span className="text-green">Gadgets</span>
        </h1>
        <p className="lg:text-[22px]">
          We ensure maximum satisfaction for all our customers....
        </p>
       
      </div>

      <div
        className="w-full h-96 bg-contain bg-bottom bg-no-repeat flex justify-center items-center xl:bg-top xl:bg-cover lg:h-[600px]"
        style={{
          backgroundImage: `url(${IMAGES.homepage.heroBg})`,
        }}
      >
        <img
          src={IMAGES.homepage.heroImage2}
          alt="hero-image"
          className="max-w-10/12 h-[90%] md:h-4/5 object-cover xl:h-[90%]"
        />
      </div>
    </div>
  );
}
