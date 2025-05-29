import { Wrapper } from "./wrapper";
import { getFollowedUsers } from "@/lib/follow-service";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Following, FollowingSkeleton } from "./following"
import { Recommended, RecommendedSkeleton } from "./recommended";

import { getRecommended } from "@/lib/recommended-service";
import { About } from "../../../about";

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

     return (
      <Wrapper>
        <Toggle />
        <div className="flex flex-col flex-grow space-y-4 pt-4 lg:pt-0">
          <Following data={following} />
          <Recommended data={recommended} />
          <div className="absolute bottom-20 flex items-center justify-center px-4">
            <About />
          </div>
        </div>
      </Wrapper>
    );
};

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60
    h-full bg-black border-r border-[#2D2E35] z50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}