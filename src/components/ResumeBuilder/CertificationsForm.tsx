
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import type { Certification } from '@/types/resume';

interface CertificationsFormProps {
  certifications: Certification[];
  onUpdate: (certifications: Certification[]) => void;
}

const CertificationsForm = ({ certifications, onUpdate }: CertificationsFormProps) => {
  const addCertification = () => {
    const newCertification: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      expiry_date: '',
      credential_id: '',
      url: ''
    };
    onUpdate([...certifications, newCertification]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    onUpdate(updated);
  };

  const removeCertification = (index: number) => {
    onUpdate(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <Card key={cert.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Certification {index + 1}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeCertification(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Certification Name *</Label>
              <Input
                value={cert.name}
                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <Label>Issuing Organization *</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Issue Date</Label>
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(index, 'date', e.target.value)}
                />
              </div>
              <div>
                <Label>Expiry Date</Label>
                <Input
                  type="month"
                  value={cert.expiry_date}
                  onChange={(e) => updateCertification(index, 'expiry_date', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Credential ID</Label>
              <Input
                value={cert.credential_id}
                onChange={(e) => updateCertification(index, 'credential_id', e.target.value)}
                placeholder="ABC123456789"
              />
            </div>

            <div>
              <Label>Verification URL</Label>
              <Input
                value={cert.url}
                onChange={(e) => updateCertification(index, 'url', e.target.value)}
                placeholder="https://verify.example.com/cert/123456"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addCertification} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
};

export default CertificationsForm;
