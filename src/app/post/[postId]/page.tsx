"use client"
import  Styles  from "@/app/page.module.css"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import { TPost } from "../page"
export default function DataBlog({params} : {params:{postId:string}}){
    const [DataPots,SetDataPots] = useState<TPost>()
     const id = params.postId;
     const [edit,setEdit] =useState(false)
     const [inputstate,setinputstate] = useState({
        title:"",
        description:""
    })
    const fetchDataPost = async () => {
        // chuyền 1 đường dẫn lên server
        fetch(`http://localhost:3000/post/api/${id}`)
        // sau khi chuyền thành công thì sẽ trả về từ dạng json sang javascrip
        .then((res)=>res.json())
        .then((data)=>{
             console.log({data})
            SetDataPots(data.data)
        })

    }
    useEffect(() => {
       if(id){
        fetchDataPost()
       }
    },[id])
    const handlechange = (e: ChangeEvent<HTMLInputElement>) =>{
        console.log({name:e.target.name},{value:e.target.value})
        setinputstate({
            ...inputstate,
            [e.target.name]:e.target.value
        })
    }
    const handleUpdate = async () => {
        fetch(`http://localhost:3000/post/api/${id}`,{
            method:"PUT",
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
                fetchDataPost(),
                setEdit(false),
                 setinputstate({
                    title:"",
                    description:""
                 })
             }
        })
    } 
    return (
        <main className={Styles.main}>
            <h1>Details Post</h1>
            <h2>Title:  {edit ? (<input id="title" name="title" value={inputstate.title} onChange={handlechange}/>) : (<span> {DataPots?.title}</span>)}</h2>
            <h2> decription: {edit ? (<input id="description" name="description" value={inputstate.description} onChange={handlechange}/>) : (<span> {DataPots?.decription}</span>)}</h2>
            {edit ? ( <button onClick={handleUpdate}>Cập nhật</button>) : ( <button onClick={() => {
                setEdit(true),
                setinputstate({
                    title: DataPots?.title || "",
                    description: DataPots?.decription || "",
                })
            }}>Edit</button>)}
          <Link href={`/post`}>
          <button>Home</button>
          </Link>
        </main>
    )
}

