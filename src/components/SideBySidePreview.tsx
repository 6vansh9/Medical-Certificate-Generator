
import React from 'react';
import { MedicalCertFormData } from './MedicalCertForm';
import MedicalCertificate from './MedicalCertificate';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SideBySidePreviewProps = {
  data: MedicalCertFormData;
};

const SideBySidePreview: React.FC<SideBySidePreviewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 print:hidden">
      <Card className="border rounded-lg shadow-sm">
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-4 text-medical-darkBlue border-b pb-2">Before (Default Font)</h3>
          <div className="p-4 border rounded-lg bg-white">
            <p className="mb-2 font-normal">
              This is to certify that <span className="font-bold">{data.patientName}</span> was examined by me at{" "}
              <span className="font-bold">{data.clinicName}</span> on {new Date(data.visitDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
            <p className="mb-2 font-normal">
              Upon examination, the patient was found to be suffering from{" "}
              <span className="font-bold">{data.medicalReason}</span>.
            </p>
            <p className="mb-2 font-normal">
              The student has been advised rest and is medically unfit to attend
              classes/work from{" "}
              <span className="font-bold">
                {new Date(data.restStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>{" "}
              to{" "}
              <span className="font-bold">
                {new Date(data.restEndDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>.
            </p>
            <p className="mb-2 font-normal">
              They may resume regular activities from{" "}
              <span className="font-bold">
                {new Date(new Date(data.restEndDate).setDate(new Date(data.restEndDate).getDate() + 1)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-lg shadow-sm">
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-4 text-medical-blue border-b pb-2">After (Custom Font)</h3>
          <div className="p-4 border rounded-lg bg-white">
            <p className="mb-2 certificate-text">
              This is to certify that <span className="font-bold">{data.patientName}</span> was examined by me at{" "}
              <span className="font-bold">{data.clinicName}</span> on {new Date(data.visitDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
            <p className="mb-2 certificate-text">
              Upon examination, the patient was found to be suffering from{" "}
              <span className="font-bold">{data.medicalReason}</span>.
            </p>
            <p className="mb-2 certificate-text">
              The student has been advised rest and is medically unfit to attend
              classes/work from{" "}
              <span className="font-bold">
                {new Date(data.restStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>{" "}
              to{" "}
              <span className="font-bold">
                {new Date(data.restEndDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>.
            </p>
            <p className="mb-2 certificate-text">
              They may resume regular activities from{" "}
              <span className="font-bold">
                {new Date(new Date(data.restEndDate).setDate(new Date(data.restEndDate).getDate() + 1)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SideBySidePreview;
