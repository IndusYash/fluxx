import React from 'react';

// Prop definitions for the WhatWeDoSection
export interface WhatWeDoSectionProps { }

// Prop definitions for the Activity items
export interface ActivityProps {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    imageUrl: string;
    color: string;
}