import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-neutral-500 dark:bg-black px-2 lg:px-4 flex items-center shadow-sm">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Center: Search (takes up all available space) */}
      <div className="flex-grow px-4">
        <Search />
      </div>

      {/* Right: Actions */}
      <div className="flex-shrink-0">
        <Actions />
      </div>
    </nav>
  );
};
