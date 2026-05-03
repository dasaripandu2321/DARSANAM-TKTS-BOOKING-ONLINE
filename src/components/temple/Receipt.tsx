import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Download, X, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/temple-data";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface BookingRecord {
  bookingId: string;
  devotee: { 
    name: string; 
    age: string; 
    contact: string; 
    idType: string; 
    idNumber: string;
    email?: string;
    userId?: string;
  };
  date: string;
  items: { service: Service; qty: number }[];
  total: number;
  createdAt: string;
}

interface Props {
  booking: BookingRecord;
  onClose: () => void;
}

export const Receipt = ({ booking, onClose }: Props) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate QR code with booking details
    const qrData = JSON.stringify({
      id: booking.bookingId,
      name: booking.devotee.name,
      date: booking.date,
      total: booking.total
    });
    
    QRCode.toDataURL(qrData, { width: 200, margin: 1 })
      .then(setQrCodeUrl)
      .catch(console.error);
  }, [booking]);

  const handlePrint = () => window.print();

  const handleExportPDF = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`${booking.bookingId}-receipt.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm print:bg-transparent print:p-0">
      <div ref={receiptRef} className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card shadow-temple print:max-h-none print:shadow-none">
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="absolute right-3 top-3 print:hidden"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="bg-temple-gradient px-6 py-6 text-center text-primary-foreground">
          <CheckCircle2 className="mx-auto mb-2 h-12 w-12" />
          <h2 className="font-display text-2xl font-bold">Booking Confirmed</h2>
          <p className="text-sm opacity-90">Sri Kshetra Digital Receipt</p>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Booking ID</span>
            <span className="font-display font-bold text-maroon">{booking.bookingId}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Field label="Devotee" value={booking.devotee.name} />
            <Field label="Age" value={booking.devotee.age} />
            <Field label="Contact" value={booking.devotee.contact} />
            <Field label="Visit Date" value={booking.date} />
            <Field label="ID Proof" value={`${booking.devotee.idType}: ${booking.devotee.idNumber}`} full />
          </div>

          <div className="ornate-divider my-4" />

          <div>
            <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-maroon">
              Services Booked
            </h4>
            <table className="w-full text-sm">
              <tbody>
                {booking.items.map(({ service, qty }) => (
                  <tr key={service.id} className="border-b border-border/60">
                    <td className="py-2">{service.name}</td>
                    <td className="py-2 text-center text-muted-foreground">×{qty}</td>
                    <td className="py-2 text-right font-medium">
                      ₹{(service.price * qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gold-gradient px-4 py-3 text-primary-foreground shadow-gold">
            <span className="font-display font-semibold">Total Paid</span>
            <span className="font-display text-2xl font-bold">₹{booking.total.toFixed(2)}</span>
          </div>

          {qrCodeUrl && (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-gold bg-amber-50/40 p-4">
              <img src={qrCodeUrl} alt="Booking QR Code" className="h-40 w-40" />
              <p className="text-center text-xs font-medium text-maroon">
                Scan this QR code at temple entrance
              </p>
            </div>
          )}

          <p className="text-center text-xs italic text-muted-foreground">
            🕉 May the divine grace be with you. Please arrive 30 minutes prior to your slot with this receipt and original ID proof.
          </p>

          <div className="flex gap-2 print:hidden">
            <Button onClick={handlePrint} className="flex-1 bg-temple-gradient text-primary-foreground">
              <Download className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button onClick={handleExportPDF} variant="outline" className="flex-1 border-gold">
              <FileDown className="mr-2 h-4 w-4" /> PDF
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 border-gold">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, full }: { label: string; value: string; full?: boolean }) => (
  <div className={full ? "col-span-2" : ""}>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="font-medium text-foreground">{value}</div>
  </div>
);
