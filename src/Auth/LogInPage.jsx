import {useContext, useEffect, useRef, useState} from "react";
import { supabase } from "../../utils/supabase.js";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";

export const LogInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error(error.message);
        } else {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (!sessionError && sessionData.session) {
                localStorage.setItem("my_app_token", sessionData.session.access_token);
                navigate("/");
            } else {
                console.error("Failed to fetch session:", sessionError?.message);
            }
        }
    };

    if (isLoggedIn()) {
        navigate("/");
        return null;
    }



    return (
        <div className={"flex flex-col justify-center items-center flex-1"}>
            <div className={"w-[35%] h-[40%] bg-gray-100 rounded-[20px] shadow-lg my-27 p-2 flex flex-col"}
                 style={{ background: "#e8e8e8" }}>
                <p className={"text-3xl font-bold p-5"}>Log In</p>

                <form onSubmit={handleSignIn} className="flex flex-col p-5 gap-4">
                    <input
                        type="email"
                        ref={inputRef}
                        placeholder="Email"
                        className="p-3 rounded-md border border-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-md border border-gray-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-600 transition"
                    >
                        Sign In
                    </button>
                </form>

                <Link className={"text-sm px-5 mb-3 self-end"} to={'/auth/register'}>Register</Link>
            </div>
        </div>
    );
};
