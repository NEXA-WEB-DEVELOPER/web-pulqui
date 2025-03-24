import ReclaimModal from "@/components/reclaim-modal"
import ContactModal from "@/components/contact-modal"
import VideoModal from "@/components/video-modal"
import PromoSection from "@/components/promo-section"
import DestinationsSection from "@/components/destinations-section"
import ClubSection from "@/components/club-section"
import AboutSection from "@/components/about-section"
import ReviewsSection from "@/components/reviews-section"
import Footer from "@/components/footer"
import HomeHero from "@/components/home"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HomeHero />

      {/* Promos Section */}
      <PromoSection />

      {/* Destinations Section */}
      <DestinationsSection />

      {/* Club Section */}
      <ClubSection />

      {/* About Section */}
      <AboutSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ReclaimModal />
      <ContactModal />
      <VideoModal />
    </div>
  )
}

