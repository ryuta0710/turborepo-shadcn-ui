import { Button } from "@repo/ui/components/ui/button";
import Image from "next/image";
import Logo from "../../../../public/images/Logo.svg";
// import { useTranslation } from "react-i18next";
import { Heading } from "@repo/ui/components/ui/heading";
import HomeImg from "../../../../public/images/home_visual.png";
import "./style.css";

const HomePage = () => {
    // const { t } = useTranslation();
  
    return (
      <main>
        <div className="w-full">
          <div className="pt-12 flex justify-center">
            <Image src={Logo} alt="Roast Logo" />
          </div>
          <Heading level={2} className="mt-11 mb-0 p-0 text-white text-center">
            Upload your dating pics
          </Heading>
          <p className="mt-3 text-color text-white text-center">
            To get your profile analysis
          </p>
          <div className="mt-11 text-center flex justify-center">
            <Image src={HomeImg} alt="Dating Home" width={250} />
          </div>
          <div className="fixed bottom-12 left-0 flex justify-center w-full">
            <a href="/upload">
              <Button className="bg-white py-4 text-center text-black px-[88px] rounded-full h-[58px]">
                <Heading level={4} className="mb-0 p-0 text-black text-center">
                  Upload photos
                </Heading>
              </Button>
            </a>
          </div>
        </div>
      </main>
    );
};

export default HomePage;
