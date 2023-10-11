import "./App.css";
import BannerComponent from "./components/Banner";

function App() {
  return (
    <div className="flex flex-col items-center">
      <img src="/butopea-logo-full.svg" alt="Butopea Logo" />
      <BannerComponent
        mode="square"
        carouselOnMobile={false}
        items={[
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400",
            link: "https://example.com/link1",
          },
          {
            type: "cta",
            title: "CTA Title",
            button: "CTA Button",
            link: "https://example.com/link2",
          },
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400",
            link: "https://example.com/link3",
          },
        ]}
      />
      <BannerComponent
        mode="square"
        carouselOnMobile={true}
        items={[
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400?random=1",
            link: "https://example.com/link2",
          },
          {
            type: "cta",
            title: "CTA Title",
            button: "CTA Button",
            link: "https://example.com/link1",
          },
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400?random=2",
            link: "https://example.com/link3",
          },
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400?random=3",
            link: "https://example.com/link3",
          },
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400?random=4",
            link: "https://example.com/link3",
          },
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400?random=5",
            link: "https://example.com/link3",
          },
        ]}
      />
      <BannerComponent
        mode="rectangle"
        carouselOnMobile={false}
        items={[
          {
            type: "image",
            aspectRatio: "rectangle",
            src: "https://picsum.photos/1200/400",
            link: "https://example.com/link1",
          },
          {
            type: "image",
            aspectRatio: "square",
            src: "https://picsum.photos/400",
            link: "https://example.com/link1",
          },
          {
            type: "cta",
            title: "CTA Title",
            button: "CTA Button",
            link: "https://example.com/link1",
          },
        ]}
      />
    </div>
  );
}

export default App;
