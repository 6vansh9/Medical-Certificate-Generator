
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from 'lucide-react';

type MedicalCertFormProps = {
  onFormSubmit: (formData: MedicalCertFormData) => void;
};

export type MedicalCertFormData = {
  patientName: string;
  visitDate: string;
  restStartDate: string;
  restEndDate: string;
  medicalReason: string;
  doctorName: string;
  clinicName: string;
  clinicAddress: string;
  contactNumber: string;
};

const MedicalCertForm: React.FC<MedicalCertFormProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<MedicalCertFormData>({
    patientName: '',
    visitDate: new Date().toISOString().split('T')[0],
    restStartDate: new Date().toISOString().split('T')[0],
    restEndDate: new Date().toISOString().split('T')[0],
    medicalReason: 'Viral Fever',
    doctorName: '',
    clinicName: '',
    clinicAddress: '',
    contactNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  const medicalReasons = [
    'Viral Fever',
    'Food Poisoning',
    'Common Cold',
    'Migraine',
    'Acute Gastroenteritis',
    'Respiratory Infection',
    'Seasonal Flu',
    'Allergic Reaction',
    'Physical Injury',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="patientName">Patient Name</Label>
        <Input
          id="patientName"
          name="patientName"
          placeholder="Student Full Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="visitDate">Date of Visit</Label>
        <div className="relative">
          <Input
            id="visitDate"
            name="visitDate"
            type="date"
            value={formData.visitDate}
            onChange={handleChange}
            className="pl-10"
            required
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="restStartDate">Rest Period Start</Label>
          <div className="relative">
            <Input
              id="restStartDate"
              name="restStartDate"
              type="date"
              value={formData.restStartDate}
              onChange={handleChange}
              className="pl-10"
              required
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="restEndDate">Rest Period End</Label>
          <div className="relative">
            <Input
              id="restEndDate"
              name="restEndDate"
              type="date"
              value={formData.restEndDate}
              onChange={handleChange}
              className="pl-10"
              required
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="medicalReason">Medical Reason</Label>
        <Select 
          value={formData.medicalReason} 
          onValueChange={(value) => handleSelectChange(value, 'medicalReason')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            {medicalReasons.map((reason) => (
              <SelectItem key={reason} value={reason}>
                {reason}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="doctorName">Doctor Name</Label>
        <Input
          id="doctorName"
          name="doctorName"
          placeholder="Dr. Jane Smith"
          value={formData.doctorName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="clinicName">Clinic Name</Label>
        <Input
          id="clinicName"
          name="clinicName"
          placeholder="Medical Care Center"
          value={formData.clinicName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="clinicAddress">Clinic Address</Label>
        <Textarea
          id="clinicAddress"
          name="clinicAddress"
          placeholder="123 Health Avenue, Medical District"
          value={formData.clinicAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="contactNumber">Contact Number</Label>
        <Input
          id="contactNumber"
          name="contactNumber"
          placeholder="(123) 456-7890"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-medical-blue hover:bg-medical-darkBlue">
        Generate Certificate
      </Button>
    </form>
  );
};

export default MedicalCertForm;
