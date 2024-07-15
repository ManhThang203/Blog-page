"use client"
import  Styles  from "@/app/page.module.css"
import { set } from "mongoose"
import Link from "next/link"
import { handleClientScriptLoad } from "next/script"
import { title } from "process"
import { ChangeEvent, useEffect, useState } from "react"
import { json } from "stream/consumers"
export interface TPost{
    title:string,
    decription:string,
    _id:string
}
export default function ListBlog(){
    const [listPots,SetlistPots] = useState<{data: TPost[],Totalpage:number}>({data:[],Totalpage:0})
    const [params,setParams] = useState({
        page:1,
        limit:2
    })
    const [inputstate,setinputstate] = useState({
        title:"",
        description:""
    })
    const fetchListPost = async () => {
        // chuyền 1 đường dẫn lên server
        fetch(`http://localhost:3000/post/api?limit=${params.limit}&page=${params.page}`)
        // sau khi chuyền thành công thì sẽ trả về từ dạng json sang javascrip
        .then((res)=>res.json())
        .then((data)=>{
             console.log({data})
            SetlistPots({
                data: data.data,
                Totalpage:data?.meta.Totalpage
            })
        })

    }
    useEffect(() => {
        fetchListPost();
    },[params.page])
    // xoa
    const handleDelete =async (id:string) => {
        fetch(`http://localhost:3000/post/api/${id}`,{
            method:"DELETE"
        })
        // sau khi chuyền thành công thì sẽ trả về từ dạng json sang javascrip
        .then((res)=>res.json())
        .then((data)=>{
             console.log({data})
             // nếu con data thì cập nhật luôn khi xóa
             if(data.message === "Success"){
                 fetchListPost()
             }
        })
    }
    const handlechange = (e: ChangeEvent<HTMLInputElement>) =>{
        console.log({name:e.target.name},{value:e.target.value})
        setinputstate({
            ...inputstate,
            [e.target.name]:e.target.value
        })
    }
    const handleCreate = async () => {
        fetch(`http://localhost:3000/post/api`,{
            method:"POST",
            body:JSON.stringify({
                ...inputstate
            })
        })
        // sau khi chuyền thành công thì sẽ trả về từ dạng json sang javascrip
        .then((res)=>res.json())
        .then((data)=>{
             console.log({data})
             // nếu con data thì cập nhật luôn khi xóa
             if(data.message === "Success"){
                 fetchListPost(),
                 setinputstate({
                    title:"",
                    description:""
                 })
             }
        })
    } 
    return (
      <div style={{display:"flex", justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",gap:"10px"}}>
        <div>
            <label htmlFor="title">Title</label> {" "}
            <input id="title" name="title" value={inputstate.title} onChange={handlechange}/>
        </div>
          <div>
            <label htmlFor="description">Description</label> {" "}
            <input id="description" name="description" value={inputstate.description} onChange={handlechange}/>
        </div>
        <button onClick={handleCreate}>Create</button>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", gap:"10px"}}>
            <h1>Bài Post</h1>
            {listPots?.data?.map((item: TPost)=>{
                return <div key={item._id}>
                    <Link href={`/post/${item._id}`}>{item.title}</Link> {" "}
                    <span style={{cursor:"pointer"}} onClick={() => handleDelete(item._id)}>X</span>
                </div>
            })}
        </div>
        <div style={{display:"flex",gap:"10px"}}>
            <button disabled={params.page === 1} onClick={() => {
                setParams({
                    ...params,
                    page: params.page - 1
                })
            }}>Previous</button>
            <div>Curren Page : {params.page}</div>
            <button disabled={params.page === listPots.Totalpage} onClick={() => {
                setParams({
                    ...params,
                    page: params.page + 1
                })
            }} >Next</button>
        </div>
      </div>
    )
}