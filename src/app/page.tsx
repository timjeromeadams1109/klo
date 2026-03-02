import HeroBanner from "@/components/home/HeroBanner";
import LatestBrief from "@/components/home/LatestBrief";
import TrendingTopics from "@/components/home/TrendingTopics";
import FeaturedInsight from "@/components/home/FeaturedInsight";
import AIToolOfTheWeek from "@/components/home/AIToolOfTheWeek";
import QuickAssessmentCTA from "@/components/home/QuickAssessmentCTA";
import UpcomingKeynote from "@/components/home/UpcomingKeynote";
import UpcomingStrategyRoom from "@/components/home/UpcomingStrategyRoom";
import FadeInOnScroll from "@/components/shared/FadeInOnScroll";

export default function Home() {
  return (
    <>
      {/* Hero — full width, no container constraints */}
      <HeroBanner />

      {/* Remaining sections — contained and spaced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
        <div className="py-16 space-y-20">
          <FadeInOnScroll delay={0}>
            <LatestBrief />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.05}>
            <TrendingTopics />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <FeaturedInsight />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.05}>
            <AIToolOfTheWeek />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <QuickAssessmentCTA />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.05}>
            <UpcomingKeynote />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <UpcomingStrategyRoom />
          </FadeInOnScroll>
        </div>
      </div>
    </>
  );
}
