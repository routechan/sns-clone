import apiClient from "@/lib/apiClient";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
    user:null | {
        id:number;
        username:string;
        email:string
    }
    login:(token:string)=> void;
    logout:()=>void
    
}

interface AuthProviderProps{
    children:ReactNode;
}
const AuthContext = React.createContext<AuthContextType>({
   user:null,
    login:()=>{},
    logout:()=>{},
})


export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:AuthProviderProps)=>{
  const [user,setUser] = useState<null|{id:number;email:string,username:string}>(null);
    useEffect(()=>{

        const token = localStorage.getItem("auth_token")
if(token){
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`
      }
    apiClient.get("/users/find").then((res)=>{
        setUser(res.data.user)
    }).catch((err)=>{
        console.log(err)
    })
    },
[])
const login = async (token:string) =>{
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`
    localStorage.setItem("auth_token",token)
    try{
        apiClient.get("/users/find").then((res)=>{
            setUser(res.data.user)
        }).catch((err)=>{
            console.log(err)
        })
        
    }catch(err){
        console.log(err)
    }
}

const logout = ()=>{
    localStorage.removeItem("auth.token")
    delete apiClient.defaults.headers["Authorization"]
    setUser(null);

}
const value = {
    user,login,logout
}
return(
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}