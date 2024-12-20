"use client";

import { Tabs } from "antd";
import { Banner } from "./banner";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import { useClientTranslation } from "@/i18n/client";
import { useEffect, useRef, useState } from "react";
import Divider from "@/components/devider";

export default function ParthnershipPage() {
  const { TabPane } = Tabs;
  const { t } = useClientTranslation("Common");
  const [activeKey, setActiveKey] = useState<string>("1");
  const [tabTop, setTabTop] = useState<number>(504); 

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: section1Ref, key: "1" },
        { ref: section2Ref, key: "2" },
        { ref: section3Ref, key: "3" },
        { ref: section4Ref, key: "4" },
      ];

      const threshold = 100;
      const scrollY = window.scrollY;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tabsOffset = tabsRef.current?.getBoundingClientRect().top ?? 0;

      if (scrollY > 504) {
        setTabTop(115); 
      } else {
        setTabTop(504);
      }

      sections.forEach(({ ref, key }) => {
        const sectionTop = ref.current?.getBoundingClientRect().top;
        if (
          sectionTop !== undefined &&
          sectionTop <= threshold &&
          sectionTop >= -threshold
        ) {
          setActiveKey(key);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabChange = (key: string) => {
    setActiveKey(key);

    switch (key) {
      case "1":
        section1Ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "2":
        section2Ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "3":
        section3Ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "4":
        section4Ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  return (
    <>
      <Banner />
      <section className="">
        <div
          ref={tabsRef}
          style={{
            position: tabTop === 115 ? "fixed" : "absolute",
            top: `${tabTop}px`,
          }}
          className="text-2xl font-semibold text-black shadow-md w-full"
        >
          <Tabs activeKey={activeKey} onChange={handleTabChange} centered>
            <TabPane tab={t("partnership.se01")} key="1" />
            <TabPane tab={t("partnership.se02")} key="2" />
            <TabPane tab={t("partnership.se03")} key="3" />
            <TabPane tab={t("partnership.se04")} key="4" />
          </Tabs>
        </div>

        <section className="container mx-auto mt-[45px]">
          <div ref={section1Ref}>
            <Section1 />
          </div>
          <Divider color="emerald-500" height="2px" />

          <div ref={section2Ref}>
            <Section2 />
          </div>
          <Divider color="emerald-500" height="2px" />

          <div ref={section3Ref}>
            <Section3 />
          </div>
          <Divider color="emerald-500" height="2px" />

          <div ref={section4Ref}>
            <Section4 />
          </div>
          <Divider color="emerald-500" height="2px" />
        </section>
      </section>
    </>
  );
}
