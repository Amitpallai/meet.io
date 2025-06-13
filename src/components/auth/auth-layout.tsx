import { VideoIcon } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-[url('/videocall.jpg')] bg-cover bg-center bg-no-repeat p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary/20" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <VideoIcon className="mr-2 h-6 w-6" />
                    Meet.io
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            Meet.io has transformed how our team collaborates. The video quality and features are superior to any other platform we have used.
                        </p>
                        <footer className="text-sm">Amit pallai</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px]">
                    {children}
                </div>
            </div>
        </div>
    );
}