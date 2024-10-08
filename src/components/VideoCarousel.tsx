import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { replayImg, playImg, pauseImg } from "../utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { hightlightsSlides } from "../utils/Constants";

gsap.registerPlugin(ScrollTrigger);
const VideoCarousel = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>(
    new Array(hightlightsSlides.length).fill(null)
  );
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: true,
  });
  const [loadedData, setloadedData] = useState<SyntheticEvent[]>([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetaData = (event: SyntheticEvent) => {
    setloadedData((pre) => [...pre, event]);
  };
  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      //animate progress of video

      const animation = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(animation.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "8vw"
                  : window.innerWidth < 1200
                  ? "8vw"
                  : "4vw",
            });
            gsap.to(videoSpanRef.current[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
          }
        },
      });
      if (videoId === 0) {
        animation.restart();
      }
      const animationUpdate = () => {
        animation.progress(
          Number(videoRef.current[videoId]?.currentTime) /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) gsap.ticker.add(animationUpdate);
      else gsap.ticker.remove(animationUpdate);
    }
  }, [videoId, startPlay, isPlaying]);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
        start: "top top",
      },
      onComplete: () => {},
    });
  }, [isEnd, videoId]);

  const handleProcess = (process: string, index?: number) => {
    console.log(process, index);
    switch (process) {
      case "end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: false,
          videoId: index ? index + 1 : 1,
        }));
        break;

      case "last":
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;

      case "reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;

      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      case "pause":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };
  const handleButtonClick = () => {
    console.log("handle click", isLastVideo, isPlaying);
    if (isLastVideo) {
      handleProcess("reset");
    } else {
      if (!isPlaying) {
        handleProcess("play");
      } else {
        handleProcess("pause");
      }
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, index) => (
          <div key={slide.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  className="video"
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  onPlay={() =>
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                      startPlay: true,
                    }))
                  }
                  onLoadedMetadata={(e) => {
                    handleLoadedMetaData(e);
                  }}
                  ref={(el) => {
                    videoRef.current[index] = el;
                  }}
                  onEnded={() =>
                    index !== 3
                      ? handleProcess("end", index)
                      : handleProcess("last")
                  }
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text) => (
                  <p className="md:text-2xl text-xl font-medium" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-8">
        <div className="flex py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                videoDivRef.current[index] = el;
              }}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full "
                ref={(el) => (videoSpanRef.current[index] = el)}
              />
            </div>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={handleButtonClick}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
