import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { SheetlyFullVideo } from './SheetlyFullVideo';
import { SheetlyHomepageVideo } from './SheetlyHomepageVideo';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SheetlyHomepageVideo"
        component={SheetlyHomepageVideo}
        durationInFrames={3860} // Exact 128.67s @ 30 fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SheetlyFullAd"
        component={SheetlyFullVideo}
        durationInFrames={4076} // Exact 135.85 seconds @ 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
