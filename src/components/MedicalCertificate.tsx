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
      <div className="flex flex-col items-center">
        <div className="certificate-container" id="certificate" style={{padding: 0, border: 'none', boxShadow: 'none', borderRadius: 18, background: '#fff'}}>
          {/* Header */}
          <div className="prescription-header" style={{background: 'linear-gradient(120deg, #e74c63 80%, #fff 100%)'}}>
            <div className="prescription-header-left">
              <img src="/caduceus.png" alt="Medical Illustration" className="prescription-header-img" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Medical_caduceus.svg'; }} />
            </div>
            <div className="prescription-header-right">
              <div className="prescription-doctor-name" style={{color: '#fff', fontWeight: 800}}>{data.doctorName || 'Dr. John Smith'}</div>
              <div className="prescription-doctor-degree" style={{color: '#f8e9ec', fontWeight: 600}}>{data.clinicName || 'Clinic Name'}</div>
            </div>
          </div>
          <div className="prescription-divider" />
          {/* Body */}
          <div className="prescription-body">
            {/* Left: Notes/Prescription */}
            <div className="prescription-left">
              <div className="prescription-rx">℞</div>
              <div className="prescription-date">DATE: {formatDate(data.visitDate)}</div>
              <div className="prescription-notes">
                This is to certify that {data.patientName || 'Patient Name'} was examined by me at {data.clinicName || 'Clinic Name'} on {formatDate(data.visitDate)}. Upon examination, the patient was found to be suffering from {data.medicalReason || 'Medical Reason'}. The student has been advised rest and is medically unfit to attend classes or work from {formatDate(data.restStartDate)} to {formatDate(data.restEndDate)}. They may resume regular activities from {format(add(parseISO(data.restEndDate), { days: 1 }), 'MMMM d, yyyy')}.
              </div>
              <img src="/lovable-uploads/a3e843d0-6203-4599-b447-f56195af6454.png" alt="Watermark" className="prescription-watermark" />
            </div>
            {/* Right: Patient Info */}
            <div className="prescription-right" style={{background: '#f8fafd', borderRadius: 12, boxShadow: '-2px 0 8px rgba(0,0,0,0.03)'}}>
              <div>
                <div className="prescription-label">NAME</div>
                <div className="prescription-value">{data.patientName || 'Patient Name'}</div>
              </div>
              <div>
                <div className="prescription-label">ADDRESS</div>
                <div className="prescription-value">{data.clinicAddress || '—'}</div>
              </div>
            </div>
          </div>
          <div className="prescription-divider" />
          {/* Footer */}
          <div className="prescription-footer" style={{background: '#e74c63', color: '#fff'}}>
            <div className="prescription-footer-contact">
              <span className="prescription-footer-icon">📞</span> {data.contactNumber || '123-456-7890'}
              <span className="prescription-footer-icon">📍</span> {data.clinicAddress || 'Street address here, City, State, Zip Code'}
            </div>
            <div>
              <span className="prescription-footer-icon">🕒</span> {format(new Date(), 'EEE, MMM d, h:mm a')}
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

