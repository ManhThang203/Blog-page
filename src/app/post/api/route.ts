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
export async function GET(req:NextRequest){
    await ConnectDB();
    // lấy ra limit
    const limit = req.nextUrl.searchParams.get("limit") ?? 2;
    // lấy ra page
    const page = req.nextUrl.searchParams.get("page") ?? 1;
    // yêu cầu từ phía backend gửi về số bài post
    const totalpost = await Post.countDocuments();
    // yêu cầu từ phía backend gửi về số trang post
    const totalpage = Math.ceil(totalpost / +limit);
    // limit giởi hạn số phần tử trong mảng
    const allPost = await Post.find().skip((+page - 1) * +limit).limit(+limit)
    try {
        return NextResponse.json({
            data:allPost,
            meta:{
                Totalpage:totalpage,
                TotalCount: totalpost 
            },
            message:"Success"
        },{
            status:201,
            statusText:"Create"
        })
    } catch (error) {
        console.log({error})
        return NextResponse.json({
            data:null,
            message:"Failde"
        },{
            status:400,
            statusText:"Error"
        })
    }
}