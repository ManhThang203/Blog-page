import Post from "@/app/config/models/Post";
import ConnectDB from "@/app/config/mongoo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
      await ConnectDB()
      try {
        // lấy ra body
        const {title,decription} = await req.json()
        console.log({title,decription})
        const exited = await Post.findOne({title})
        console.log({exited})
        if(!exited){
            const newPost = await Post.create({title,decription})
            return  NextResponse.json(
                {
                     data:newPost,
                     message:"Success"
                }
                ,{
                    status:210,
                    statusText:"Create"
                }
            )
        }
       else{
        return NextResponse.json(
            {
            
                data:null,
                message:"The title  post is already"
            },
            {
                status:400,
                statusText:"Invalid"
            }
    )
       }
      } catch (error) {
        console.log({error})
        return  NextResponse.json(
            {
                 data:null,
                 message:"Error"
            }
            ,{
                status:400,
                statusText:"Failed"
            }
        )
      }
}