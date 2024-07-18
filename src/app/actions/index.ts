"use server"
import { revalidatePath } from "next/cache"

export async function getlistPost(limit:number,page:number){
    "use server"
    const res = await fetch(`http://localhost:3000/post/api?limit=${limit}&page=${page}`,{
        // tạo key
        next: {tags:["list-post"]}
    })
    const data = await res.json()
    const Totalpage = data?.meta.Totalpage
    return {
        data:data.data,
        Totalpage
    }
}
export async function Createpost(data:FormData){
   
    // console.log({data:data.get("title")})
    const title = data.get("title")
    const decription = data.get("decription")
   const res = await fetch(`http://localhost:3000/post/api`,{
    method:"POST",
    body:JSON.stringify({
        title,
        decription
    })
   })
   const reponse = await res.json()
   //cach 1
//    const callapi = getlistPost
//cap nhật trang mơi thông qua key
   revalidatePath("list-post")
   return {
    reponse
   }
}
export async function Deletepost(id:string){
   const res = await fetch(`http://localhost:3000/post/api/${id}`,{
    method:"DELETE",
   })
   const reponse = await res.json()
   //cach 1
//    const callapi = getlistPost
//cap nhật trang mơi thông qua key
   revalidatePath("list-post")
   return {
    reponse
   }
}