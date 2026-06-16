"use client"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserAvatarLabelGroup from '../user-avatar-label-group';
import { useToast } from '../ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

interface User {
  name: string;
  email: string;
  image: string;
}

interface DropdownProps {
  user: User;
}

export default function UserAccountDropdown({ user }: DropdownProps) {
    const { toast } = useToast()
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='px-0 py-0 md:px-4 md:py-6'>
                    <UserAvatarLabelGroup user={user}/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Your Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => router.push('/calls/profile')}
                    >
                        <Icons.avatar width="16" height="16" className='mr-2'/>
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => router.push('/calls/settings')}
                    >
                        <Icons.settings width="16" height="16" className='mr-2'/>
                        Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={(event) => {
                            event.preventDefault()
                            signOut({
                                callbackUrl: `${window.location.origin}/`,
                            })
                            .catch((error) => {
                                console.error('Error signing out:', error);
                                toast({
                                    title: 'Error signing out',
                                    description: 'Please try again.',
                                    variant: 'destructive'
                                })
                            });
                        }}
                    >
                        <Icons.logout width="16" height="16" className='mr-2'/>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent> 
        </DropdownMenu>
    );
}