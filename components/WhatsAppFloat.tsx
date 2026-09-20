import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full elevation-3 hover:elevation-5 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat with Al Syed Aluminium & Glass Fabrications on WhatsApp (0337 9289079)"
      >
        <WhatsAppIcon className="w-7 h-7 shrink-0" />
      </a>
    </aside>
  );
}
