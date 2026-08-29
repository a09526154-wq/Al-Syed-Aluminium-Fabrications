import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <a
        href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.25)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/30"
        aria-label="Chat with Al Syed Aluminium & Glass Fabrications on WhatsApp (0337 9289079)"
      >
        <WhatsAppIcon className="w-8 h-8 shrink-0" />
      </a>
    </aside>
  );
}
