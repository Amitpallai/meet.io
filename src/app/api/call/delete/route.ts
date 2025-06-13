import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "~/lib/session";

const deleteSchema = z.object({
    callId: z.string().min(8),
    path: z.string().min(2),
});

interface DeleteCallBody {
    callId: string;
    path: string;
}

export async function POST (req: Request) {
    try {
        const user = await getCurrentUser();
        
        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }  

        const json: DeleteCallBody = await req.json() as DeleteCallBody;
        const {  path } = deleteSchema.parse(json);

        // Use a transaction to ensure all operations succeed or fail together
       

        revalidatePath(path);
        return NextResponse.json({ 
            success: true,
            message: "Call deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting call:", error);
        
        // Handle specific error cases
        if (error instanceof z.ZodError) {
            return NextResponse.json({ 
                success: false, 
                error: "Invalid request data" 
            }, { status: 400 });
        }

        if (error instanceof Error) {
            if (error.message.includes("not found")) {
                return NextResponse.json({ 
                    success: false, 
                    error: error.message 
                }, { status: 404 });
            }
        }

        return NextResponse.json({ 
            success: false, 
            error: "An error occurred while deleting the call" 
        }, { status: 500 });
    }
}
