"use client"
import {useFormStatus } from "react-dom"

export function ButtonPost(){
    const {pending} = useFormStatus()
    return (
        <button type="submit">{pending ? "Creat data" :"Creat"}</button>
    )
}
export default ButtonPost