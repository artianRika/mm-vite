import {useState} from "react";
import {supabase} from "../../utils/supabase.js";
import {Link, useNavigate} from "react-router-dom";

export const RegisterPage = () =>{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    const handleSignUp = async (e) =>{
        e.preventDefault();

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            console.error("Signup error:", signUpError.message);
            return;
        }

        const userId = signUpData?.user?.id;

        if (userId) {
            const { error: insertErr } = await supabase
                .from('Users')
                .insert([
                    {
                        user_id: userId,
                        email: email,
                        first_name: firstName,
                        last_name: lastName
                    }
                ]);

            if (insertErr) {
                console.error("Error inserting into Users table:", insertErr.message);
            } else {
                console.log("User successfully registered and added to Users table.");
                navigate('/auth/login');
            }
        }
    };



    return (
        <div className={"flex flex-col justify-center items-center flex-1"}>
            <div className={"w-[35%] h-[40%] bg-gray-100 rounded-[20px] shadow-lg my-15 p-2 flex flex-col"}
                 style={{background: "#e8e8e8"}}>
                <p className={"text-3xl font-bold p-5"}>Register</p>

                <form onSubmit={handleSignUp} className="flex flex-col p-5 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="p-3 rounded-md border border-gray-300"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="p-3 rounded-md border border-gray-300"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
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
                        onClick={e => handleSignUp(e)}
                    >
                        Register
                    </button>
                </form>

                <Link className={"text-sm px-5 mb-3 self-end"} to={'/auth/login'}>Log In</Link>
            </div>
        </div>
    )
}