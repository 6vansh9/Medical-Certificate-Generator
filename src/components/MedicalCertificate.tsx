
import React from 'react';
import { MedicalCertFormData } from './MedicalCertForm';
import { Button } from "@/components/ui/button";
import { Download, Printer } from 'lucide-react';
import { format, add, parseISO } from 'date-fns';

type MedicalCertificateProps = {
  data: MedicalCertFormData;
};

const formatDate = (dateString: string): string => {
  try {
    // Parse the ISO date string
    const date = parseISO(dateString);
    // Format the date as "Month Day, Year" (e.g., "May 2, 2025")
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    return dateString;
  }
};

const MedicalCertificate: React.FC<MedicalCertificateProps> = ({ data }) => {
  const resumeDate = add(parseISO(data.restEndDate), { days: 1 });
  
  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white shadow-md rounded-lg overflow-hidden print:shadow-none relative" id="certificate">
        {/* Watermark */}
        <img 
          src="/lovable-uploads/a3e843d0-6203-4599-b447-f56195af6454.png" 
          alt="Watermark" 
          className="certificate-watermark"
        />
        
        {/* Header */}
        <div className="bg-gradient-to-r from-medical-darkBlue to-medical-blue p-6 text-white flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-white text-4xl mr-2">+</div>
            <h1 className="text-2xl md:text-3xl font-bold">{data.clinicName}</h1>
          </div>
          <div className="flex flex-col items-end text-sm">
            <p>{data.clinicAddress}</p>
            <p>Tel: {data.contactNumber}</p>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="p-6 print:p-4 relative">
          <h2 className="text-center text-2xl font-bold mb-6 text-medical-darkBlue border-b-2 border-gray-200 pb-2">
            CERTIFIED MEDICAL CERTIFICATE
          </h2>

          <div className="space-y-4 text-medical-darkGray font-serif">
            <p className="certificate-text">
              This is to certify that <span className="font-bold">{data.patientName}</span> was examined by me at{" "}
              <span className="font-bold">{data.clinicName}</span> on {formatDate(data.visitDate)}.
            </p>

            <p className="certificate-text">
              Upon examination, the patient was found to be suffering from{" "}
              <span className="font-bold">{data.medicalReason}</span>.
            </p>

            <p className="certificate-text">
              The student has been advised rest and is medically unfit to attend
              classes/work from <span className="font-bold">{formatDate(data.restStartDate)}</span> to{" "}
              <span className="font-bold">{formatDate(data.restEndDate)}</span>.
            </p>

            <p className="certificate-text">
              They may resume regular activities from{" "}
              <span className="font-bold">{format(resumeDate, 'MMMM d, yyyy')}</span>.
            </p>

            <p className="mt-8">
              Issued on: <span className="font-bold">{format(new Date(), 'MMMM d, yyyy')}</span>
            </p>
          </div>

          {/* Doctor's signature and stamp */}
          <div className="mt-20 flex justify-between items-end relative">
            {/* Stamp Image - Now positioned at bottom right */}
            <img 
              src="/lovable-uploads/4ec4b281-0fbf-4e22-a3be-92f44f0682e7.png" 
              alt="Official Stamp" 
              className="certificate-stamp"
            />
            
            <div className="border-t border-gray-400 pt-2 w-1/3">
              <p className="doctor-signature mb-1">{data.doctorName}</p>
              <p className="text-sm">{data.clinicName}</p>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-500 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="inline-block mr-1">📅</span> Issued: {format(new Date(), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block mr-1">⏱️</span> {format(new Date(), 'h:mm a')}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center print:hidden">
        <Button onClick={printCertificate} className="bg-medical-blue hover:bg-medical-darkBlue flex gap-2">
          <Printer size={16} />
          <span>Print / Download Certificate</span>
        </Button>
      </div>
    </div>
  );
};

export default MedicalCertificate;
