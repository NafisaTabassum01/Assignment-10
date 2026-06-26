import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";

export const getUserSession = async ()=>{
    const session = await auth.api.getSession({
        headers : await headers()

    })

  if (!session?.user) {
    return null;
  }

  if (session.user.status === "Blocked") {
    redirect("/blocked");
  }

    return session?.user || null;

}

export const requireRole = async(role)=>{
    const user = await getUserSession()
    if(!user){
        redirect('/login')
    }
    if(user?.role !==role){
        redirect('/unauthorized')
    }
    return user;
}