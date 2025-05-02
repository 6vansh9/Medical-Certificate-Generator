
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
      <div className="bg-white shadow-md rounded-lg overflow-hidden print:shadow-none" id="certificate">
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
        <div className="p-6 print:p-4">
          <h2 className="text-center text-2xl font-bold mb-6 text-medical-darkBlue border-b-2 border-gray-200 pb-2">
            CERTIFIED MEDICAL CERTIFICATE
          </h2>

          <div className="space-y-4 text-medical-darkGray">
            <p>
              This is to certify that <span className="font-bold">{data.patientName}</span> was examined by me at{" "}
              <span className="font-bold">{data.clinicName}</span> on {formatDate(data.visitDate)}.
            </p>

            <p>
              Upon examination, the patient was found to be suffering from{" "}
              <span className="font-bold">{data.medicalReason}</span>.
            </p>

            <p>
              The student has been advised rest and is medically unfit to attend
              classes/work from <span className="font-bold">{formatDate(data.restStartDate)}</span> to{" "}
              <span className="font-bold">{formatDate(data.restEndDate)}</span>.
            </p>

            <p>
              They may resume regular activities from{" "}
              <span className="font-bold">{format(resumeDate, 'MMMM d, yyyy')}</span>.
            </p>

            <p className="mt-8">
              Issued on: <span className="font-bold">{format(new Date(), 'MMMM d, yyyy')}</span>
            </p>
          </div>

          {/* Doctor's signature and stamp */}
          <div className="mt-20 flex justify-between items-end">
            <div className="border-t border-gray-400 pt-2 w-1/3">
              <p className="font-bold">{data.doctorName}</p>
              <p className="text-sm">{data.clinicName}</p>
            </div>

            <div className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-medical-stamp bg-white opacity-80 relative">
              <div className="absolute text-medical-stamp">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M19,7h-8A4,4,0,0,0,7,11v8A4,4,0,0,0,11,23h8A4,4,0,0,0,23,19V11A4,4,0,0,0,19,7ZM11,9h3v2H11Zm1,12a2,2,0,1,1,2-2A2,2,0,0,1,12,21Zm5-8H15V10h2Zm0,6H15V16h2Zm3-6H18V10h2Zm0,6H18V16h2ZM5,3A2,2,0,0,1,7,1H8V3H7V5H5ZM1,7H3V8H1ZM3,1H5V3H3ZM1,3H3V5H1ZM3,5H5V7H3Z"/>
                </svg>
                <div className="text-xs text-center mt-1 font-semibold">CERTIFIED</div>
              </div>
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
