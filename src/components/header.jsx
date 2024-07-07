import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {

    const navigate = useNavigate();

    const { user, fetchUser } = UrlState();

    const { loading, fn: fnLogout } = useFetch(logout);

    return (
        <>
            <nav className="flex items-center justify-between py-4">
                <Link to="/">
                    <img src="./logo.png" className="h-16" alt="Trimrr logo" />
                </Link>

                <div>
                    {!user ?
                        <Button onClick={() => navigate("/auth")}>Login</Button>
                        : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-10 overflow-hidden rounded-full">
                                    <Avatar>
                                        <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
                                        <AvatarFallback>YT</AvatarFallback>
                                    </Avatar>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link to="/dashboard" className="flex">
                                            <LinkIcon className="w-4 h-4 mr-2" />
                                            My Links
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='text-red-400'>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <span onClick={() => {
                                            fnLogout().then(() => {
                                                fetchUser()
                                                navigate("/")
                                            })
                                        }}>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        )
                    }
                </div >
            </nav >
            {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
        </>
    )
}

export default Header