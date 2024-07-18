// "use client"
import Image from "next/image";
import styles from "@/app/page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { TPost } from "../page";
import Link from "next/link";

export default function Home({params}:{params:{postId:string}}) {
    console.log({params})
    const [datapost,setDatapost] = useState<TPost>()
    const id = params.postId
    const [input,setInput] = useState(false)
    const [inputdata,setinputdata] = useState({
      title:"",
      decription:""
  })
    const fecthDatapost = async () => {
        fetch(`http://localhost:3000/post/api/${id}`)
        .then((res)=> res.json())
        .then((data)=>{
            console.log({data})
            setDatapost(data.data)
        })
    }
    const handleinput = (e:ChangeEvent<HTMLInputElement>) =>{
      console.log({name:e.target.name},{value:e.target.value})
      setinputdata({
          ...inputdata,
          [e.target.name]:e.target.value
      })
  }
  const handledit = async () =>{
    fetch(`http://localhost:3000/post/api/${id}`,{
        method:"PUT",
        body:JSON.stringify({
            ...inputdata
        })
    })
    .then((res)=> res.json())
    .then((data)=>{
        console.log({data})

       fecthDatapost()
       setInput(false)
    })
}
    useEffect(() => {
       if(id){
        fecthDatapost()
       }
    },[id])
  return (
    <main className={styles.main}>
     <h1>Details Post</h1>
     <h2>Title:{input ? (<input type="title" value={inputdata.title} name="title" onChange={handleinput}/>):(<span>Title:{datapost?.title}</span>)}</h2>
     <h2>Decription:{input ? (<input type="decription" value={inputdata.decription} name="decription" onChange={handleinput}/>):(<span>Title:{datapost?.decription}</span>)}</h2>
    {input ?( <button onClick={handledit}>Edit</button>) :( <button onClick={()=>{
      setInput(true),
      setinputdata({
        title:datapost?.title || "",
        decription:datapost?.decription || ""
      })
    }}>Update</button>)}
     <Link href={`/post`}><button>Home</button></Link>
    </main>
  );
}
