import React from 'react';
import { X, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface TeamMember {
  name: string;
  email?: string;
  phone?: string;
  rollNumber?: string;
  branch?: string;
  year?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  onChange: (member: TeamMember) => void;
  onRemove?: () => void;
  isLeader?: boolean;
  errors?: Partial<Record<keyof TeamMember, string>>;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  index,
  onChange,
  onRemove,
  isLeader = false,
  errors = {},
}) => {
  const handleChange = (field: keyof TeamMember, value: string | null) => {
    onChange({ ...member, [field]: value ?? '' });
  };

  const BRANCHES = [
    'CSE',
    'ECE',
    'ME',
    'CE',
    'EE',
    'IT',
    'IOT',
    'CHe',
    'BPharma',
    'Other',
  ];

  const YEARS = ['1', '2', '3', '4'];

  return (
    <div
      className={cn(
        "glass-card p-5 space-y-4 animate-fade-in",
        isLeader && "gradient-border"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isLeader ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          )}>
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {isLeader ? 'Team Leader' : `Member ${index}`}
            </h3>
            {isLeader && (
              <span className="text-xs text-primary">Primary Contact</span>
            )}
          </div>
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input
            placeholder="Enter full name"
            value={member.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        {isLeader ? (
          // Leader: Email
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={member.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
        ) : (
          // Member: Branch (select)
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Branch</label>
            <Select value={member.branch || ''} onValueChange={(v) => handleChange('branch', v)}>
              <SelectTrigger className={errors.branch ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.branch && <p className="text-xs text-destructive">{errors.branch}</p>}
          </div>
        )}

        {isLeader ? (
          // Leader: Phone
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <Input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={member.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
        ) : (
          // Member: Year (select)
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Year</label>
            <Select value={member.year || ''} onValueChange={(v) => handleChange('year', v)}>
              <SelectTrigger className={errors.year ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
          </div>
        )}

        {isLeader ? (
          // Leader: Roll Number
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Roll Number</label>
            <Input
              placeholder="Enter roll number"
              value={member.rollNumber || ''}
              onChange={(e) => handleChange('rollNumber', e.target.value)}
              className={errors.rollNumber ? 'border-destructive' : ''}
            />
            {errors.rollNumber && <p className="text-xs text-destructive">{errors.rollNumber}</p>}
          </div>
        ) : (
          // Member: (empty cell to keep grid alignment) -> show nothing in second column row 2? We'll show Branch already, so put an empty div
          <div />
        )}

        {isLeader ? (
          // Leader: Branch
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Branch</label>
            <Select value={member.branch || ''} onValueChange={(v) => handleChange('branch', v)}>
              <SelectTrigger className={errors.branch ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.branch && <p className="text-xs text-destructive">{errors.branch}</p>}
          </div>
        ) : (
          // Member: empty to keep grid consistent
          <div />
        )}

        {isLeader ? (
          // Leader: Year
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Year</label>
            <Select value={member.year || ''} onValueChange={(v) => handleChange('year', v)}>
              <SelectTrigger className={errors.year ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
          </div>
        ) : (
          <div />
        )}

      </div>

    </div>
  );
};

export default TeamMemberCard;
