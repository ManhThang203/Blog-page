'use client';
import Link from "next/link"
import { TPost } from "@/app/post/page"
import { Deletepost } from "@/app/actions"

export const Itempost = ({item}:{item:TPost}) =>{
    return (
        <div key={item._id}>
    <Link href={`/post/${item._id}`}>{item.title}</Link> {" "}
    <span style={{cursor:"pointer"}} onClick={() =>  Deletepost(item._id)}>X</span>
</div>
    )
}
export default Itempost