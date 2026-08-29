"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Search,
  ExternalLink,
  PanelTop,
  DoorOpen,
  Building2,
  ShieldCheck,
  Bath,
  Sparkles,
  Upload,
  ImageIcon,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconOrImage?: string | null;
  order: number;
  createdAt: string;
}

const AVAILABLE_ICONS = [
  { id: "window", label: "Windows", icon: PanelTop },
  { id: "door", label: "Doors", icon: DoorOpen },
  { id: "building", label: "Curtain Walls", icon: Building2 },
  { id: "shield", label: "Railings", icon: ShieldCheck },
  { id: "bath", label: "Showers", icon: Bath },
  { id: "layers", label: "Cladding", icon: Layers },
  { id: "sparkles", label: "Specialty", icon: Sparkles },
];

export default function AdminServicesPage() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ServiceItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [order, setOrder] = useState(1);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (res.ok && data.success) {
        setServicesList(data.services);
      } else {
        setError(data.error || "Failed to load services");
      }
    } catch {
      setError("Network error fetching services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return servicesList;
    const q = searchQuery.toLowerCase();
    return servicesList.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [servicesList, searchQuery]);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed");

      setImageUrl(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    try {
      const method = editingItem ? "PUT" : "POST";
      const payload = {
        id: editingItem?.id,
        title,
        description,
        iconOrImage: imageUrl.trim() || null,
        order: Number(order) || 0,
      };

      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service");

      setSuccessMessage(
        editingItem
          ? `Service "${title}" updated successfully.`
          : `Service "${title}" created successfully.`
      );
      setTimeout(() => setSuccessMessage(null), 3000);

      setIsModalOpen(false);
      setEditingItem(null);
      resetForm();
      fetchServices();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving service");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/services?id=${deletingItem.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete service");

      setSuccessMessage(`Service "${deletingItem.title}" deleted.`);
      setTimeout(() => setSuccessMessage(null), 3000);

      setDeletingItem(null);
      fetchServices();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting service");
    } finally {
      setActionLoading(false);
    }
  };

  const openCreate = () => {
    resetForm();
    setEditingItem(null);
    setOrder(servicesList.length + 1);
    setIsModalOpen(true);
  };

  const openEdit = (item: ServiceItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.iconOrImage || "");
    setOrder(item.order);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setOrder(servicesList.length + 1);
  };

  const renderServiceImageThumbnail = (srv: ServiceItem) => {
    const fallbackImages: Record<string, string> = {
      "aluminium-windows":
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200&auto=format&fit=crop",
      "glass-doors":
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=200&auto=format&fit=crop",
      "curtain-walls":
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=200&auto=format&fit=crop",
      "glass-railings":
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=200&auto=format&fit=crop",
      "shower-enclosures":
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop",
      "acp-cladding":
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop",
    };

    const displayUrl =
      srv.iconOrImage && srv.iconOrImage.startsWith("http")
        ? srv.iconOrImage
        : fallbackImages[srv.slug] || "/logo.jpeg";

    return (
      <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-neutral-border bg-neutral-light shrink-0">
        <Image
          src={displayUrl}
          alt={srv.title}
          fill
          className="object-cover"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-border">
        <div>
          <h1 className="text-xl font-bold text-primary">
            Services Management
          </h1>
          <p className="text-xs text-text-dark/60 mt-0.5">
            Add, update images, and manage fabrication services displayed on the website ({servicesList.length} total).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search input */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-text-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-dark/40 hover:text-text-dark text-xs"
              >
                ×
              </button>
            )}
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center space-x-1.5 bg-[#1E5FA8] hover:bg-[#2C74C9] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-green-800 font-bold">
            ×
          </button>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-700 font-bold">
            ×
          </button>
        </div>
      )}

      {/* Flat Data Table */}
      <div className="bg-white rounded-xl border border-neutral-border shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#1E5FA8] mx-auto mb-2" />
            <p className="text-xs text-text-dark/60">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center text-text-dark/60 text-xs">
            {searchQuery ? `No services matching "${searchQuery}".` : "No services configured yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light border-b border-neutral-border text-text-dark/70 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 pl-4 w-14 text-center">#</th>
                  <th className="p-3.5 w-16">Cover</th>
                  <th className="p-3.5">Service Name</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Website View</th>
                  <th className="p-3.5 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-border">
                {filteredServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-neutral-light/50 transition-colors">
                    {/* Order */}
                    <td className="p-3.5 pl-4 text-center font-mono font-bold text-[#1E5FA8]">
                      #{srv.order}
                    </td>

                    {/* Image Thumbnail */}
                    <td className="p-3.5">
                      {renderServiceImageThumbnail(srv)}
                    </td>

                    {/* Title */}
                    <td className="p-3.5 font-bold text-primary">
                      <span className="text-xs font-bold text-primary block">
                        {srv.title}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="p-3.5 text-text-dark/70 max-w-md truncate">
                      {srv.description}
                    </td>

                    {/* Live Website Link */}
                    <td className="p-3.5">
                      <Link
                        href={`/services/${srv.slug}`}
                        target="_blank"
                        className="inline-flex items-center space-x-1 text-xs text-[#1E5FA8] hover:underline font-semibold"
                        title="Open service page in new tab"
                      >
                        <span>View Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 pr-4 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => openEdit(srv)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-[#1E5FA8] hover:bg-blue-100 transition-colors"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingItem(srv)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* EDIT / CREATE MODAL WITH IMAGE UPLOAD */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-neutral-border animate-in fade-in duration-150 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-border mb-4">
              <h2 className="text-sm font-bold text-primary">
                {editingItem ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md hover:bg-neutral-light text-text-dark/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Service Cover Image Upload */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-1.5">
                  Service Cover Image
                </label>
                
                {imageUrl ? (
                  <div className="relative h-36 w-full rounded-xl overflow-hidden border border-neutral-border group bg-neutral-light mb-2">
                    <Image
                      src={imageUrl}
                      alt="Service preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <label className="cursor-pointer px-3 py-1.5 bg-white text-primary text-xs font-bold rounded-lg hover:bg-neutral-light shadow-md">
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 shadow-md"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-neutral-border rounded-xl p-4 text-center bg-neutral-light/50 hover:bg-neutral-light transition-colors mb-2">
                    <input
                      type="file"
                      id="service-image-upload"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="service-image-upload"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-6 h-6 animate-spin text-[#1E5FA8]" />
                      ) : (
                        <Upload className="w-6 h-6 text-text-dark/40" />
                      )}
                      <span className="text-xs font-bold text-[#1E5FA8]">
                        {uploadingImage ? "Uploading to Cloudinary..." : "Click to upload service photo"}
                      </span>
                      <span className="text-[10px] text-text-dark/50">
                        PNG, JPG, WebP up to 5MB
                      </span>
                    </label>
                  </div>
                )}

                {/* Direct Image URL input fallback */}
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Or paste image URL (https://...)"
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-border text-[11px] focus:outline-none focus:border-[#1E5FA8]"
                />
              </div>

              {/* Service Name and Display Position */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-text-dark mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Aluminium Windows"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-dark mb-1">
                    Display Position *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-border text-xs font-mono focus:outline-none focus:border-[#1E5FA8]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Service Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the materials, glass types, and applications..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8] leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-neutral-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-text-dark hover:bg-neutral-light border border-neutral-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || uploadingImage}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#1E5FA8] hover:bg-[#2C74C9] text-white transition-colors disabled:opacity-60"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingItem ? "Save Changes" : "Save Service"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================================================ */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-xl border border-neutral-border text-center space-y-3 animate-in fade-in duration-150">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-primary">
              Delete Service?
            </h3>
            <p className="text-xs text-text-dark/70">
              Are you sure you want to delete <strong>&ldquo;{deletingItem.title}&rdquo;</strong>?
            </p>
            <div className="flex justify-center space-x-2 pt-2">
              <button
                onClick={() => setDeletingItem(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-text-dark hover:bg-neutral-light border border-neutral-border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-60"
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
