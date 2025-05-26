import {createContext, useEffect, useState} from "react";
import {supabase} from "../../utils/supabase.js";
import {useNavigate} from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ( {children} ) => {

    const [authUser, setAuthUser] = useState(null);
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    async function fetchAuthUser() {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
        } else {
            setAuthUser(data.user);
        }
    }

    useEffect(() => {
        fetchAuthUser();
    }, []);

    const getUserData = async () => {
        const {data, error} = await supabase
            .from('Users')
            .select('*')
            .eq('user_id', authUser.id)
            .maybeSingle()

        if(error) {
            console.log("error fetching user data for "+ authUser.id)
        }
        else{
            console.log("Fetching user data for:", authUser.id);
            setUser(data)
        }
    }


    useEffect(() => {
        if (authUser?.id) {
            getUserData();
        }
    }, [authUser]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setAuthUser(null);
        setUser(null);
        navigate('/auth/login');
    };

    return(
        <UserContext.Provider
            value={{
                user,
                authUser,
                signOut
            }}
        >
            { children }
        </UserContext.Provider>
    )
}

//TODO: after login the authuser is null... if you refresh is ok but .. fix it