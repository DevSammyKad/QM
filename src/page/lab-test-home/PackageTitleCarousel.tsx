import { Routes } from "@/routes.config";
import PackageCard from "@/src/components/custom-cards/package-card/package-card";
import Carousel from "@/src/components/custom-carousel/carousel";
import CarouselTitleBox from "@/src/components/custom-carousel/carousel-title-box";
import SiteLayout from "@/src/layouts/site-layout";
import { PackageCardType } from "@/src/types";

type Props = {
  packageData: PackageCardType[];
  title?: string;
  titleDescription?: string;
};

export default function PackageTitleCarousel({
  packageData,
  title,
  titleDescription,
}: Props) {
  return (
    <SiteLayout className="p-0">
      <CarouselTitleBox
        link={Routes.explorePackages}
        title={title}
        titleDescription={titleDescription}
      >
        <Carousel
          renderProp={() => {
            return packageData.map((data) => (
              <PackageCard forCarousel key={data.id} data={data} />
            ));
          }}
          slideDataLength={packageData.length}
        />
      </CarouselTitleBox>
    </SiteLayout>
  );
}
