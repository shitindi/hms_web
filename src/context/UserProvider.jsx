import {  createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({children}) => {

    const [state, setState] = useState({
        component: '',
        action: 4,     // 1 Add new, 2 Edit, 3 Delete, 4 View
        entity_id: 0,
        entities: []
    });
 
    return (
        
        <UserContext.Provider value={{state, setState}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;

