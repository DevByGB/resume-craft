import { Skeleton } from "@/components/ui/skeleton";

export const ResumesListSkeleton = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max gap-4 lg:gap-5 flex-1">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton
          key={`resume-skeleton-${index}`}
          className="w-full h-[300px]"
        />
      ))}
    </section>
  );
};
