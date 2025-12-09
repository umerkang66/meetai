'use client';

import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

import { CallUI } from './call-ui';

import '@stream-io/video-react-sdk/dist/css/styles.css';

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userImage,
  userName,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );

  const [client, setClient] = useState<StreamVideoClient>();

  useEffect(() => {
    let _client: StreamVideoClient | null = null;

    const initCall = () => {
      _client = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
        user: {
          id: userId,
          name: userName,
          image: userImage,
        },
        tokenProvider: generateToken,
      });

      setClient(_client);
    };
    initCall();

    return () => {
      if (_client) {
        _client.disconnectUser();
        setClient(undefined);
        _client = null;
      }
    };
  }, [generateToken, userId, userName, userImage]);

  const [call, setCall] = useState<Call>();
  useEffect(() => {
    if (!client) return;

    let _call: Call | null = null;
    const initCall = () => {
      _call = client.call('default', meetingId);
      _call.camera.disable();
      _call.microphone.disable();
      setCall(_call);
    };
    initCall();

    return () => {
      if (_call && _call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        _call.endCall();
        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
