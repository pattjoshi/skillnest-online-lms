import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate("/login?role=instructor")}
          variant="ghost"
          className="relative text-blue-600 font-medium after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Become an Instructor
        </Button>
        <Button variant="outline" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button onClick={() => navigate("/login")}>Signup</Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt="@user"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/my-learning">My Learning</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/profile">Edit Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
        {user?.role === "instructor" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/admin/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
