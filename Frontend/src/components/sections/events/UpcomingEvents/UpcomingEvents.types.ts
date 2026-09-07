import React from 'react';

// Prop definitions for the UpcomingEventsSection
export interface UpcomingEventsSectionProps { }

// Prop definitions for the EventCard component which is internal to this section
export interface EventProps {
    id: number;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
    isUpcoming: boolean;
    location?: string;
    attendees?: number;
    category: 'Tech' | 'Design' | 'Business' | 'Research';
    prize?: string;
    featured?: boolean;
}