import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { SheetlyFullVideo } from './SheetlyFullVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="SheetlyFullAd"
      component={SheetlyFullVideo}
      durationInFrames={4076} // Exact 135.85 seconds @ 30 fps
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(RemotionRoot);
