import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

function About() {
  return (
    <div>
      <section className="space-y-6 mb-20 md:space-y-8 lg:space-y-10">
        <h1 className="text-[45px] font-bold text-dark-blue mb-8 lg:w-4/5 lg:text-[60px]">
          We believe in providing the highest quality products. Best laptop
          accessories store online
        </h1>

        <div className="flex items-center gap-x-8 gap-y-6 lg:gap-x-14 flex-wrap text-lg text-dark-blue">
          <div className="flex items-center gap-2">
            <div className="w-7 h-0.5 bg-green" />
            <p className="capitalize">Transparency</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-0.5 bg-green" />
            <p className="capitalize">Commitment</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-0.5 bg-green" />
            <p className="capitalize">quality assurance</p>
          </div>
        </div>
      </section>

      <section className="space-y-6 mb-16 md:space-y-8 lg:space-y-10">
        <div className="h-[600px] w-full object-contain md:h-auto">
          <img
            src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812105/Showroom_djco4q.png"
            alt="about us"
            className="hidden md:inline-block max-w-full w-full max-h-full object-cover"
          />
          <img
            src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812105/Showroom_djco4q.png"
            alt="about us"
            className="max-w-full w-full h-full max-h-full md:hidden"
          />
        </div>

        <p className="font-normal lg:leading-[30px] lg:w-3/4 lg:ml-auto">
          Laptop City is brand in the IT sector that deals in sales of laptop.
          The brand is a indigenous one that opt to give maximum satisfaction to
          her clients and as well keep updated with newly emerging laptop.
          Laptop City is a brand that has been in the sales of laptop game for
          so long which gives them an appropriate measure and edge against their
          competitor
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-3 text-dark-blue">
          <p className="text-xl lg:text-2xl">Our mission</p>
          <h2 className="text-[28px] font-bold lg:text-4xl">
            "Our mission at Laptop City is to increase the number of Nigerians
            who use technology by making it accessible and affordable"
          </h2>
        </div>

        <div className="space-y-6 lg:flex lg:justify-between lg:gap-20 lg:items-start">
          <div className="h-[600px] w-full object-contain">
            <img
              src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812101/Showroom2_t7gutb.jpg"
              alt="our mission"
              className="max-w-full w-full max-h-full"
            />
          </div>

          <div className="w-full space-y-4 lg:leading-[30px]">
            <p className="font-normal">
              Laptop City is a significant online store retailer of Laptop
              accessories in Nigeria. We have offered dependable, affordable
              services. We provide a wide choice of products to satisfy
              customers' needs because we are aware of what people desire.
            </p>
            <p className="font-normal">
              Here at Laptop City, we test our products and maintain strict
              quality control to meet your expectations. We aim to reduce the
              wait time of customers as much as possible. We ensure delivery
              proceeds immediately all product conditions are met so as to avoid
              delay.
            </p>
            <p className="font-normal">
              Please we do hope all our customers cooperate with us and report
              to us with immediate effect any case of unsatisfactory service or
              customer relations agent. We aim at building a wonderful customer
              relationship to ensure maximum satisfaction with all services.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-16 px-4 lg:px-0">
        <h3 className="text-2xl font-bold text-dark-blue mb-4">
          Laptop City Gallery
        </h3>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="w-full h-[400px]"
        >
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812100/d_fn8g3i.jpg"
              alt="Showroom 1"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812100/b_pzjisk.jpg"
              alt="Showroom 2"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812100/c_cuxghd.jpg"
              alt="Showroom 3"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812099/h_lzcoyx.jpg"
              alt="Showroom 4"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812099/aboutoffice_bjdkmk.jpg"
              alt="Showroom 5"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://res.cloudinary.com/dn4hkronr/image/upload/v1749812099/a_kpmkzx.jpg"
              alt="Showroom 6"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}

export default About;
