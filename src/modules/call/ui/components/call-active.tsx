import Link from 'next/link';
import Image from 'next/image';
import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk';

interface CallActiveProps {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: CallActiveProps) => {
  return (
    <div className="flex flex-col h-screen p-4 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4 shrink-0">
        <Link
          href="/"
          className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit"
        >
          <Image src="/logo.svg" width={22} height={22} alt="Logo" />
        </Link>
        <h4 className="text-base truncate">{meetingName}</h4>
      </div>

      {/* Video Area */}
      <div className="flex-1 my-4 overflow-y-auto custom-scrollbar">
        <SpeakerLayout />
      </div>

      {/* Controls */}
      <div className="bg-[#101213] rounded-full shrink-0">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
