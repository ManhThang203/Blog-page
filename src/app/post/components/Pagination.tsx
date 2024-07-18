"use client"

import { useRouter } from "next/navigation"
import { useReducer } from "react"

export function Pagination({Totalpage,Currenlimit,Currenpage}:{Totalpage:number,Currenlimit:number,Currenpage:number}){
    const router = useRouter()
       return (
        <div style={{display:"flex",gap:"10px"}}>
        <button disabled={Currenpage === 1} onClick={() => {
            router.push(`/post?limit=${Currenlimit}&page=${Currenpage - 1}`)
        }}>Previous</button>
        <div>Curren Page : {Currenpage}</div>
        <button disabled={Currenpage === Totalpage} onClick={() => {
             router.push(`/post?limit=${Currenlimit}&page=${Currenpage + 1}`)
        }} >Next</button>
    </div>
       )
}
export default Pagination