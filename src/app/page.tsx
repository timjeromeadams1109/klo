import HeroBanner from "@/components/home/HeroBanner";
import LatestBrief from "@/components/home/LatestBrief";
import FeaturedInsight from "@/components/home/FeaturedInsight";
import QuickAssessmentCTA from "@/components/home/QuickAssessmentCTA";
import UpcomingKeynote from "@/components/home/UpcomingKeynote";

export default function Home() {
  return (
    <>
      {/* Hero — full width, no container constraints */}
      <HeroBanner />

      {/* Remaining sections — contained and spaced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 space-y-20">
          <LatestBrief />
          <FeaturedInsight />
          <QuickAssessmentCTA />
          <UpcomingKeynote />
        </div>
      </div>
    </>
  );
}
