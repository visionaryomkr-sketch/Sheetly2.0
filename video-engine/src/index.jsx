import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { SheetlyFullVideo } from './SheetlyFullVideo';
import { SheetlyHomepageVideo } from './SheetlyHomepageVideo';
import { SheetlyMetaAd1 } from './SheetlyMetaAd1';
import { SheetlyMetaAd2 } from './SheetlyMetaAd2';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SheetlyMetaAd2"
        component={SheetlyMetaAd2}
        durationInFrames={1902} // 63.4s @ 30 fps (Script 2 ElevenLabs Voiceover)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SheetlyMetaAd1"
        component={SheetlyMetaAd1}
        durationInFrames={2519} // 83.96s @ 30 fps (Script 1 ElevenLabs Voiceover)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SheetlyHomepageVideo"
        component={SheetlyHomepageVideo}
        durationInFrames={3860}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SheetlyFullAd"
        component={SheetlyFullVideo}
        durationInFrames={4076}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
