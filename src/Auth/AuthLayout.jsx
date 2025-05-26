import colors from "@/colors.js";
import { Outlet } from "react-router-dom";

export const AuthLayout = () =>{

    return (
        <div style={{background: colors.primary}} className={"min-h-screen w-full"}>
            <p className={"p-11 text-2xl font-bold"}>Where's MM</p>

            <Outlet/>
        </div>
    )
}