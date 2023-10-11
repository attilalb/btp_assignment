import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useRef, useEffect } from "react";

interface ImageItemProps {
  type: "image";
  aspectRatio?: "square" | "rectangle";
  src?: string;
  link: string;
}

interface CtaItemProps {
  type: "cta";
  title?: string;
  button: string;
  link: string;
  mode?: "square" | "rectangle";
}

type ItemProps = ImageItemProps | CtaItemProps;

interface BannerComponentProps {
  mode: "square" | "rectangle";
  carouselOnMobile: boolean;
  items: ItemProps[];
}

const ImageItem: React.FC<ItemProps> = (item) => {
  const { link, src } = item as ImageItemProps;

  return (
    <a href={link} className="w-full aspect-square md:w-1/3">
      <img src={src} alt="Image Item" className="object-cover w-full h-full" />
    </a>
  );
};

const CtaItem: React.FC<ItemProps> = (item) => {
  if (item.type !== "cta") {
    return null;
  }

  const { title, link, button, mode } = item as CtaItemProps;

  const backgroundColor = mode === "rectangle" ? "bg-white/70" : "bg-butopea";
  const textColor = mode === "rectangle" ? "text-slate-800" : "text-white";
  const borderColor =
    mode === "rectangle" ? "border-slate-800" : "border-white";

  console.log(mode);
  return (
    <div
      className={`w-full py-4 gap-4 md:aspect-square ${backgroundColor} flex flex-col items-center justify-evenly `}
      style={{
        width: "100%", // Set explicit width
        height: "100%", // Set explicit height
      }}
    >
      <p className={`text-2xl ${textColor}`}>{title}</p>
      <a href={link}>
        <button
          type="button"
          className={`px-4 py-2 border-solid ${borderColor} border-2 ${textColor} text-xl`}
        >
          {button}
        </button>
      </a>
    </div>
  );
};

const BannerComponent: React.FC<BannerComponentProps> = ({
  mode,
  carouselOnMobile,
  items,
}) => {
  // Filter out image items for the carousel
  const imageItems = items.filter((item) => item.type === "image");
  const mainCarouselRef = useRef();
  const thumbnailCarouselRef = useRef();

  useEffect(() => {
    if (mainCarouselRef.current && thumbnailCarouselRef.current) {
      mainCarouselRef.current.sync(thumbnailCarouselRef.current.splide);
    }
  }, []);
  return (
    <div id="bannerContainer" className={`w-full mt-16 flex flex-wrap ${mode}`}>
      {mode === "rectangle" ? (
        <div className="flex flex-col md:flex-row relative">
          {imageItems.map(
            (item, index) =>
              item.type !== "cta" && (
                <div
                  className={` ${
                    item.aspectRatio !== "square"
                      ? "hidden md:block "
                      : "block md:hidden md:aspect-square max-h-max"
                  }`}
                  key={index}
                >
                  <ImageItem {...item} />
                </div>
              )
          )}

          {items.map((item, index) => {
            if (item.type === "cta") {
              return (
                <div
                  className="w-full md:absolute top-0 right-0 z-10 md:w-1/3 bg-white/30 xs:bg-white "
                  key={index}
                >
                  <CtaItem {...item} mode={"rectangle"} />
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : carouselOnMobile ? (
        <>
          <div className="flex md:flex-wrap min-w-full">
            {items.map((item, index) => {
              if (item.type === "cta") {
                return (
                  <div className="w-full md:w-1/3" key={index}>
                    <CtaItem {...item} />
                  </div>
                );
              }
              if (item.type === "image") {
                return (
                  <div className="hidden md:block w-full md:w-1/3" key={index}>
                    <ImageItem {...item} />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <Splide
            ref={mainCarouselRef}
            options={{
              mediaQuery: "min",
              breakpoints: {
                640: {
                  destroy: true,
                },
              },
              tag: "section",
              type: "loop",
              gap: "1rem",
              pagination: false,
              arrows: false,
            }}
            className="md:hidden max-w-full"
          >
            {imageItems.map((item, index) => (
              <SplideSlide key={index}>
                <ImageItem {...item} />
              </SplideSlide>
            ))}
          </Splide>
          <Splide
            ref={thumbnailCarouselRef}
            options={{
              fixedWidth: "20%",
              gap: 0,
              rewind: true,
              pagination: false,
              isNavigation: true,
              arrows: false,
              mediaQuery: "min",
              hasTrack: true,
              breakpoints: {
                640: {
                  destroy: true,
                },
              },
            }}
            className="md:hidden"
          >
            {imageItems.map((item, index) => (
              <SplideSlide key={index}>
                <a href={item.link} onClick={(e) => e.preventDefault()}>
                  <ImageItem {...item} />
                </a>
              </SplideSlide>
            ))}
          </Splide>
        </>
      ) : (
        items.map((item, index) => {
          if (item.type === "image") {
            return (
              <div className="w-full md:w-1/3" key={index}>
                <ImageItem {...item} />
              </div>
            );
          }
          if (item.type === "cta") {
            return (
              <div className="w-full md:w-1/3" key={index}>
                <CtaItem {...item} />
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
};

export default BannerComponent;
