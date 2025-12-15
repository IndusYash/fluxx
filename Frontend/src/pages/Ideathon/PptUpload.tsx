import React from "react";
import PptUploadForm from "@/components/hackathon/PptUploadForm";

const PptUploadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <PptUploadForm />
      </div>
    </div>
  );
};

export default PptUploadPage;
