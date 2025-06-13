import { useHMSStore, selectIsPeerAudioEnabled, selectIsPeerVideoEnabled } from "@100mslive/react-sdk";

export function usePeerState(peerId: string) {
    const isAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peerId));
    const isVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peerId));

    return {
        isAudioEnabled,
        isVideoEnabled
    };
} 