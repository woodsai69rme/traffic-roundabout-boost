
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInfoSectionProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const PersonalInfoSection = ({ data, onChange }: PersonalInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Enter your basic contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={data.firstName || ''}
              onChange={(e) => onChange('firstName', e.target.value)}
              placeholder="John"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={data.lastName || ''}
              onChange={(e) => onChange('lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={data.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={data.location || ''}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="City, State, Country"
            />
          </div>
          <div>
            <Label htmlFor="website">Website/Portfolio</Label>
            <Input
              id="website"
              value={data.website || ''}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="https://johndoe.com"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.linkedin || ''}
              onChange={(e) => onChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea
              id="summary"
              rows={4}
              value={data.summary || ''}
              onChange={(e) => onChange('summary', e.target.value)}
              placeholder="A brief summary of your professional background and key achievements..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
