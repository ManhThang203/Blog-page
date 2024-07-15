import Post from "@/app/config/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,context: {params:{blogid:string}}){
    console.log("context",{context})
    try {
        // lấy ra id
        const id = context.params.blogid;
        // yêu cầu tìm kiếm dữ liệu thong qua id
        const exited = await Post.findById(id)
        if(!exited){
            return NextResponse.json(
                {
                    data:null,
                    message:"The post is next exited"
                },
                {
                    status:400,
                    statusText:"Failed"
                }
            )
        }
        return NextResponse.json(
            {
                data:exited,
                message:"Success"
            },
            {
                status:201,
            }
        )

        
    } catch (error) {
        return NextResponse.json(
            {
                data:null,
                message:"Error"
            },
            {
                status:500,
                statusText:"Failed"
            }
        )
    }
}
// Put 
// Update chính bản thân
export async function PUT(req:NextRequest, context: {params:{blogid:string}}) {
    try {
        // lấy ra body
        const {title,decription} = await req.json();
        const id = context.params.blogid;
        const exitedid  = await Post.findById(id)
        // nếu id không tồn tại
        if(!id){
           return NextResponse.json(
            {
                data:null,
                message:"The post not is exited"
            },
            {
                status:400,
                statusText:"Failde"
            }
           )
        }
        // _id:{$ne:id} check xem có chùng với id ko
        const exitedTitle = await Post.findOne({title,_id:{$ne:id}})
        // nếu khác title của các phần tử
        if(!exitedTitle){
            // new true sẽ update du lieu moi nhat
           const update = await Post.findByIdAndUpdate(id,{title,decription},{new:true})
           return NextResponse.json(
            {
                  data:update,
                  message:"Success"
            },
            {
                status:201
            }
           )
        }
        return NextResponse.json(
            {
                data:null,
                message:"the title post is duplicate"
          },
          {
              status:400,
              statusText:"Invalid"
          }
        )
    } catch (error) {
        console.log({error})
        return NextResponse.json(
            {
                data:null,
                message:"Failde"
            },
            {
                status:500,
                statusText:"Failde"
            }
        )
    }
    
}
// Delete
export async function DELETE(req:NextRequest,context:{params:{blogid:string}}) {
        try {
            const id = context.params.blogid;
            const extedid = await Post.findByIdAndDelete(id)
            if(!extedid){
                return NextResponse.json(
                    {
                        data:null,
                        message:"this post is not exited"
                    },
                    {
                        status:400,
                        statusText:"Failde"
                    }
                )
            }
            return NextResponse.json(
                {
                    data:extedid,
                    message:"Success"
                },
                {
                    status:201
                }
            )
        } catch (error) {
            console.log({error})
            return NextResponse.json(
                {
                    data:null,
                    message:"Failde"
                },
                {
                    status:500,
                    statusText:"Invalid"
                }
            )
        }
}