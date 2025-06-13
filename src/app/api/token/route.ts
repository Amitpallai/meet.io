/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";

const tokenSchema = z.object({
    token: z.string(),
    identifier: z.string(),
});

interface VerificationTokenResponse {
    token: string;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return new Response("Unauthorized", { status: 401 });
        }

        const json = await req.json();
        const { token, identifier } = tokenSchema.parse(json);

        // Store token in database
        await prisma.verificationToken.create({
            data: {
                token,
                identifier,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            },
        });

        return new Response(JSON.stringify({ success: true }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const identifier = searchParams.get('identifier');

        if (!identifier) {
            return new Response("Identifier is required", { status: 400 });
        }

        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                identifier,
                expires: {
                    gt: new Date(),
                },
            },
        });

        if (!verificationToken) {
            return new Response("Token not found or expired", { status: 404 });
        }

        const response: VerificationTokenResponse = { token: verificationToken.token };
        return new Response(JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
} 