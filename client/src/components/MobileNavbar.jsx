import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "@/DarkMode";

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row justify-between items-center mt-2">
          <SheetTitle>
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        <nav className="flex flex-col space-y-4 mt-6">
          {user ? (
            <>
              <SheetClose asChild>
                <Link to="/my-learning">My Learning</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/profile">Edit Profile</Link>
              </SheetClose>
              <SheetClose asChild>
                <button onClick={logoutHandler} className="text-left">
                  Log out
                </button>
              </SheetClose>
              {user?.role === "instructor" && (
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Dashboard
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login?role=instructor")}
                >
                  Become an Instructor
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button onClick={() => navigate("/login")}>Signup</Button>
              </SheetClose>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
