import Image from "next/image";
import styles from "@/app/page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Italiana } from "next/font/google";
import Link from "next/link";
import { title } from "process";
import Pagination from "./components/Pagination";
import { revalidatePath, revalidateTag } from "next/cache";
import ButtonPost from "./components/ButtonPost";
import { Createpost, Deletepost, getlistPost } from "../actions";
import Itempost from "./components/Itempost";
export interface TPost{
    title:string,
    decription:string,
    _id:string
}

export default async function Home({searchParams}:any) {
    console.log({searchParams})
    const page = searchParams?.page ?? 1
    const limit = searchParams?.limit ?? 2 
   const posts = await getlistPost(limit,page)
  return (
    <main className={styles.main}>
         <form action={Createpost}>
         <div>
            <label htmlFor="title">Title</label> {" "}
            <input id="title" name="title"/>
        </div>
          <div>
            <label htmlFor="decription">Description</label> {" "}
            <input id="decription" name="decription"/>
        </div>
         <ButtonPost/>
         </form>
     <h1>Bài Post</h1>
     {posts?.data?.map((item:TPost)=>{
       return(
        <Itempost key={item._id} item={item}/>
       )
     })}
     <Pagination Totalpage={posts.Totalpage} Currenlimit={+limit} Currenpage={+page}/>
    </main>
  );
}
