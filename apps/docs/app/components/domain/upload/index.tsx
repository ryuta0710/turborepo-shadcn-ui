"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heading } from "@repo/ui/components/ui/heading";
import Logo from "../../../../public/images/Logo-yellow.svg";
import UploadBg from "../../../../public/images/uploading-bg.png";
import { Button } from "@repo/ui/components/ui/button";
import { ImageUploader } from "../../common/imageUploader";

import "./style.css";

const secondsPerImage = 2000; // ms for unit

const defaultImgs: string[] = new Array(6).fill(null);

const UploadPage: React.FC = () => {
  const [images, setImages] = useState<string[]>(defaultImgs);

  const [isUploading, setIsUploading] = useState(false);
  const [loadStr, setLoadStr] = useState("");

  useEffect(() => {
    if (!isUploading) {
      setLoadStr("...");
      return;
    }

    setTimeout(() => {
      if (loadStr.length >= 3) {
        setLoadStr("");
      } else {
        setLoadStr((prev) => (prev += "."));
      }
    }, 500);
  }, [isUploading, loadStr]);

  useEffect(() => {
    if (isUploading) {
      const imgs = images.filter((e) => e);
      const time = imgs.length * secondsPerImage;
      const timer = setTimeout(() => {
        window.location.href = "/result";
      }, time);
      return () => clearTimeout(timer);
    }
  }, [isUploading, images]);

  const onValueChange = (file: File | null, index: number) => {
    if (file) {
      const url = URL.createObjectURL(file);
      const arr = images;
      arr[index] = url;
      setImages([...arr]);
    }
  };

  const showUploading = () => {
    setIsUploading(true);
  };

  return (
    <main>
      {!isUploading ? (
        <>
          <div className="mt-14 flex justify-center">
            <Image src={Logo} alt="Roast Logo" />
          </div>
          <Heading level={2} className="pt-16 mb-0 p-0 text-white text-center">
            Upload your dating pics
          </Heading>
          <p className="mt-4 text-color text-white text-center">
            To get your profile analysis
          </p>
          <div className="grid grid-cols-3 grid-rows-3 gap-x-2 gap-y-4 px-3 mt-7">
            {images.map((image, i) => {
              return (
                <div
                  className="pr-[6px] pb-[6px] relative max-w-[119px] w-full m-auto"
                  key={i}
                >
                  <ImageUploader
                    value={image}
                    onValueChange={(val) => onValueChange(val, i)}
                  />
                </div>
              );
            })}
          </div>
          <div className="fixed bottom-12 left-0 flex justify-center w-full">
            <Button
              className="bg-primary py-4 text-center px-[88px] rounded-full h-[58px]"
              onClick={showUploading}
            >
              <Heading level={4} className="mb-0 p-0 text-white text-center">
                Analyze it!
              </Heading>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center absolute top-0 left-0 w-full pt-14 pb-8 z-50">
            <div
              className="absolute bottom-0 w-full left-0 h-24 z-10 box-border border-b-[#FF6032] border-b-8"
              style={{
                backgroundImage:
                  "linear-gradient(360deg, rgba(255, 96, 50, 0.8) 0%, rgba(153, 58, 30, 0) 100%)",
              }}
            ></div>
            <Image src={Logo} alt="Roast Logo" className="relative z-20" />
          </div>
          <div
            className={`fixed top-0 left-0 w-full h-full bg-cover bg-black`}
            style={{ backgroundImage: `url('${UploadBg.src}'` }}
          ></div>
          <div
            className={`fixed top-0 left-0 w-full h-full flex justify-center items-center`}
            style={{
              background:
                "radial-gradient(171.33% 48.28% at 50% 51.72%, #000000 0%, rgba(0, 0, 0, 0.3) 100%)",
            }}
          >
            <div className="w-[316px] h-[186px] text-center text-wrap flex flex-col justify-between">
              <div className="w-16 h-16"></div>
              <Heading
                level={2}
                className="pt-16 mb-0 p-0 text-white text-center font-bold"
              >
                Analyzing your <span className="opacity-0">{loadStr}</span>
                profile{loadStr}
              </Heading>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default UploadPage;
