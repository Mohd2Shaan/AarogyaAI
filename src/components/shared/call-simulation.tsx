
'use client';

import { useEffect, useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

interface CallSimulationDialogProps {
  patientName: string;
  callType: 'video' | 'voice';
  children: React.ReactNode;
}

export function CallSimulationDialog({
  patientName,
  callType,
  children,
}: CallSimulationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setElapsedTime(0);
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  const patientImageId = patientName.replace(/\s/g, '');


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>
            {callType === 'video' ? 'Video' : 'Voice'} Call with {patientName}
          </DialogTitle>
          <DialogDescription>{formatTime(elapsedTime)}</DialogDescription>
        </DialogHeader>

        <div className="flex-grow relative bg-neutral-900 flex items-center justify-center">
          {callType === 'video' ? (
            <div className="w-full h-full relative">
              <Image
                src={`https://picsum.photos/seed/${patientImageId}/800/600`}
                alt="Patient Video"
                fill
                objectFit="cover"
                data-ai-hint="person portrait"
                className="transition-opacity duration-300"
                priority
              />
              <div className="absolute bottom-4 right-4 h-48 w-36 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src="https://picsum.photos/seed/doctor/300/400"
                  alt="Doctor Video"
                  fill
                  objectFit="cover"
                  data-ai-hint="doctor portrait"
                  className={`transition-opacity duration-300 ${
                    isCameraOff ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                 {isCameraOff && (
                  <div className="bg-black w-full h-full flex items-center justify-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://i.pravatar.cc/150?u=dr.smith" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                  </div>
                 )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={`https://i.pravatar.cc/150?u=${patientName}`}
                  alt={patientName}
                />
                <AvatarFallback>{patientName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="text-white text-2xl font-semibold">{patientName}</p>
              <p className="text-gray-400">On a voice call...</p>
            </div>
          )}
        </div>

        <div className="bg-background/80 backdrop-blur-sm p-4 border-t flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-14 w-14 p-0"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          {callType === 'video' && (
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-14 w-14 p-0"
              onClick={() => setIsCameraOff(!isCameraOff)}
            >
              {isCameraOff ? <VideoOff /> : <Video />}
            </Button>
          )}
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full h-14 w-14 p-0"
            onClick={() => setIsOpen(false)}
          >
            <PhoneOff />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
