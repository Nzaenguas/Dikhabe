import { Logo } from "./logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-black px-2 lg:px-4 flex items-center shadow-sm">
      <div className="flex-shrink-0">
        <Logo />
        </div>
         <div className="flex-grow" />
        <div className="flex-shrink-0">
        <Actions />
      </div>
    </nav>
  );
};
