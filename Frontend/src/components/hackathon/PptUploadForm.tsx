import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUpload from "./FileUpload";
import { toast } from "@/hooks/use-toast";
import { uploadFile, rollExists, attachPpt } from "@/lib/api/hackathon";

const PptUploadForm: React.FC = () => {
  const [roll, setRoll] = useState("");
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roll || String(roll).trim().length === 0) {
      toast({ title: "Please enter leader's roll number", variant: "destructive" });
      return;
    }
    if (!pptFile) {
      toast({ title: "Please select a PPT file to upload", variant: "destructive" });
      return;
    }

    // Enforce max PDF size 2 MB
    const MAX_PDF_BYTES = 2 * 1024 * 1024; // 2 MB
    if (pptFile.size > MAX_PDF_BYTES) {
      toast({ title: "PPT must be 2 MB or smaller", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // 1) check roll-exists
      const check = await rollExists(roll.trim());
      // According to backend: exists:true => available for attach; exists:false => message explains reason
      if (!check.exists) {
        // show backend message
        toast({ title: check.message || "Roll check failed", variant: "destructive" });
        return;
      }

      // 2) upload ppt
      const url = await uploadFile(pptFile, "pdf");

      // 3) attach-ppt
      const attachRes = await attachPpt(roll.trim(), url);

      toast({ title: attachRes?.message || "PPT attached successfully" });

      // reset
      setRoll("");
      setPptFile(null);
    } catch (err: any) {
      const msg = err?.message || "Upload failed";
      toast({ title: msg, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-card border rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">Upload PPT</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Leader Roll Number</label>
        <Input value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Enter leader roll number" />
      </div>

      <div className="text-sm text-muted-foreground">
        Not registered? <a href="/ideathon/register" className="text-primary underline">Register here</a>
      </div>

      <FileUpload
        accept=".pdf"
        label={<span>Upload PPT (PDF)</span>}
        type="pdf"
        value={pptFile}
        onChange={setPptFile}
      />

      <p className="text-xs text-muted-foreground">Max file size: 2 MB. Accepted format: PDF.</p>

      <div className="flex items-center justify-center gap-3">
        <Button type="submit" disabled={isSubmitting} className="bg-[#16A34A] hover:bg-[#15803d]">
          {isSubmitting ? "Uploading..." : "Upload and Attach PPT"}
        </Button>
        {/* <Button type="button" variant="ghost" onClick={() => { setRoll(""); setPptFile(null); }}>
          Reset
        </Button> */}
      </div>

      {/* <p className="text-sm text-muted-foreground">Enter the leader's roll. If the roll is registered and no PPT is attached yet, the PPT will be uploaded and linked to the team.</p> */}
    </form>
  );
};

export default PptUploadForm;
