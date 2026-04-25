export interface PatronInfo {
  name: string;
  title: string;
  imageUrl: string;
  visionQuote: string;
}

export interface WhatIsFluxProps {
  title: string;
  description: string;
  features: string[];
  patron?: PatronInfo;
}
