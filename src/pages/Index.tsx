
import React, { useState } from 'react';
import MedicalCertForm, { MedicalCertFormData } from '@/components/MedicalCertForm';
import MedicalCertificate from '@/components/MedicalCertificate';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [certificateData, setCertificateData] = useState<MedicalCertFormData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("form");

  const handleFormSubmit = (formData: MedicalCertFormData) => {
    setCertificateData(formData);
    setActiveTab("preview");
    toast.success("Medical certificate generated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-medical-darkBlue to-medical-blue p-4 shadow-md">
        <div className="container mx-auto flex items-center text-white">
          <div className="mr-3 text-3xl">+</div>
          <h1 className="text-2xl font-bold">Medical Certificate Generator</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Certificate
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!certificateData} className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-2 gap-8">
            <TabsContent value="form">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4 text-medical-darkBlue">Medical Certificate Information</h2>
                  <MedicalCertForm onFormSubmit={handleFormSubmit} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="md:col-span-2">
              {certificateData && (
                <div className="bg-white rounded-lg p-4 shadow-md print:shadow-none print:p-0">
                  <MedicalCertificate data={certificateData} />
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Medical Certificate Generator - For educational purposes only
        </div>
      </footer>

      {/* Print Styles - Added to the page directly */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate, #certificate * {
            visibility: visible;
          }
          #certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
          }
          @page {
            size: A4;
            margin: 20mm 15mm;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
