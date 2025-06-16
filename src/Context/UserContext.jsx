import { createContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabase.js";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const getInitialSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (data.session) {
                setAuthUser(data.session.user);
                localStorage.setItem("my_app_token", data.session.access_token);
            }
            setLoading(false);
        };

        getInitialSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setAuthUser(session.user);
                    localStorage.setItem("my_app_token", session.access_token);
                } else {
                    setAuthUser(null);
                    localStorage.removeItem("my_app_token");
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    // Fetch user data from 'Users' table
    useEffect(() => {
        const fetchUserData = async () => {
            if (!authUser?.id) return;

            const { data, error } = await supabase
                .from("Users")
                .select("*")
                .eq("user_id", authUser.id)
                .maybeSingle();

            if (!error) {
                setUser(data);
            }
        };

        fetchUserData();
    }, [authUser]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setAuthUser(null);
        setUser(null);
        localStorage.removeItem("my_app_token");
        navigate("/auth/login");
    };

    const isLoggedIn = () => {
        return !!authUser;
    };

    return (
        <UserContext.Provider
            value={{
                authUser,
                user,
                isLoggedIn,
                signOut,
                loading
            }}
        >
            {!loading && children}
        </UserContext.Provider>
    );
};
