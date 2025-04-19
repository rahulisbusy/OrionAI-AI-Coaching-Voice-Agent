import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateDiscussionRoom = mutation(
    {
        args: {
            coachingOption: v.string(),
            topicName: v.string(),
            coachingExpert: v.string()
            
        },
        handler: async (ctx, args) => {
            const result = await ctx.db.insert("discussionRoom",{
                coachingOption: args.coachingOption,
                topicName: args.topicName,
                coachingExpert: args.coachingExpert
            });
            return result;
        }
   
    }
)
export const GetDiscussionRoom = query(
    {
        args: {
            id: v.id("discussionRoom") // Specify the table name here
        },
        handler: async (ctx, args) => {
            const result = await ctx.db.get(args.id);
            return result;
        }
    }
);

export const Updateconversation=mutation({
    args:{
        id:v.id("discussionRoom"),
        conversation:v.any()
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.patch(args.id,{
            conversation:args.conversation
        });
        return result;
    }
})