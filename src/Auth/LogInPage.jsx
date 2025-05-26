import {useState} from "react";
import {supabase} from "../../utils/supabase.js";
import {Link, useNavigate} from "react-router-dom";

export const LogInPage = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    const handleSignIn = async (e) =>{
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log(error.message);
        } else {
            navigate("/");
        }
    }

    return (
            <div className={"flex flex-col justify-center items-center flex-1"}>
                <div className={"w-[35%] h-[40%] bg-gray-100 rounded-[20px] shadow-lg my-27 p-2 flex flex-col"}
                     style={{background: "#e8e8e8"}}>
                    <p className={"text-3xl font-bold p-5"}>Log In</p>

                    <form onSubmit={handleSignIn} className="flex flex-col p-5 gap-4">
                        <input
                            type="email"
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
                            onClick={e => handleSignIn(e)}
                        >
                            Sign In
                        </button>
                    </form>

                    <Link className={"text-sm px-5 mb-3 self-end"} to={'/auth/register'}>Register</Link>
                </div>
            </div>
    )
}