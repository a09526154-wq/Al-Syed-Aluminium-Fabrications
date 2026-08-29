"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getOptimizedCloudinaryUrl } from "@/lib/cloudinary-url";
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  cloudinaryPublicId?: string | null;
  projectType: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("residential");
  const [formProjectType, setFormProjectType] = useState("Luxury Residence");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formPublicId, setFormPublicId] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (res.ok && data.success) {
        setItems(data.items);
      } else {
        setError(data.error || "Failed to load gallery items");
      }
    } catch (err) {
      setError("Network error fetching gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormImageUrl(data.url);
      setFormPublicId(data.publicId || "");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          category: formCategory,
          projectType: formProjectType,
          imageUrl: formImageUrl,
          cloudinaryPublicId: formPublicId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add project");

      setIsUploadOpen(false);
      resetForm();
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating project");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingItem.id,
          title: formTitle,
          category: formCategory,
          projectType: formProjectType,
          imageUrl: formImageUrl || editingItem.imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update project");

      setEditingItem(null);
      resetForm();
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating project");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?id=${deletingItem.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete project");

      setDeletingItem(null);
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting project");
    } finally {
      setActionLoading(false);
    }
  };

  const openEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormProjectType(item.projectType);
    setFormImageUrl(item.imageUrl);
  };

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("residential");
    setFormProjectType("Luxury Residence");
    setFormImageUrl("");
    setFormPublicId("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-border shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-primary">
            Gallery Portfolio Management
          </h2>
          <p className="text-xs text-text-dark/60 mt-1">
            Upload and organize projects displayed on the public gallery and homepage.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsUploadOpen(true);
          }}
          className="inline-flex items-center space-x-2 bg-[#1E5FA8] hover:bg-[#2C74C9] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Project</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-700 font-bold">
            ×
          </button>
        </div>
      )}

      {/* Gallery Items Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-border">
          <Loader2 className="w-6 h-6 animate-spin text-[#1E5FA8] mx-auto mb-2" />
          <p className="text-xs text-text-dark/60">Loading portfolio...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-border">
          <ImageIcon className="w-10 h-10 text-text-muted mx-auto mb-2 opacity-50" />
          <p className="text-sm font-bold text-primary">No Gallery Projects Yet</p>
          <p className="text-xs text-text-dark/60 mt-1">
            Click &ldquo;Upload New Project&rdquo; to add your first photo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-border shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-neutral-light">
                  <Image
                    src={getOptimizedCloudinaryUrl(item.imageUrl, "f_auto,q_auto,w_600")}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-primary/90 text-accent font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-bold text-primary line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-dark/60 mt-0.5">
                    {item.projectType}
                  </p>
                  <p className="text-[10px] text-text-dark/40 mt-2 font-mono">
                    Added: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-end space-x-2 border-t border-neutral-border mt-2">
                <button
                  onClick={() => openEdit(item)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1E5FA8] hover:bg-blue-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingItem(item)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* UPLOAD / EDIT MODAL */}
      {/* ============================================================ */}
      {(isUploadOpen || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-border animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-primary">
                {editingItem ? "Edit Gallery Project" : "Upload New Project"}
              </h3>
              <button
                onClick={() => {
                  setIsUploadOpen(false);
                  setEditingItem(null);
                }}
                className="p-1.5 rounded-lg hover:bg-neutral-light text-text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingItem ? handleUpdate : handleCreate} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Modern Villa Sliding Windows"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Category *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8]"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="before_after">Before & After</option>
                </select>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Project Type / Subtitle *
                </label>
                <input
                  type="text"
                  required
                  value={formProjectType}
                  onChange={(e) => setFormProjectType(e.target.value)}
                  placeholder="e.g. Luxury Penthouse / Corporate Plaza"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8]"
                />
              </div>

              {/* File Upload to Cloudinary */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Project Image (Cloudinary) *
                </label>
                <div className="border border-dashed border-neutral-border rounded-xl p-4 text-center bg-neutral-light/50">
                  <input
                    type="file"
                    id="admin-gallery-file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="admin-gallery-file"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-1"
                  >
                    <Upload className="w-5 h-5 text-[#1E5FA8]" />
                    <span className="text-xs font-semibold text-primary">
                      {formImageUrl ? "Change Photo" : "Select Image from Computer"}
                    </span>
                  </label>
                </div>

                {uploadingFile && (
                  <p className="text-[11px] text-[#1E5FA8] mt-1 flex items-center space-x-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Uploading to Cloudinary...</span>
                  </p>
                )}

                {formImageUrl && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mt-3 border border-neutral-border">
                    <Image
                      src={formImageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-text-dark hover:bg-neutral-light border border-neutral-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || uploadingFile || !formImageUrl}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1E5FA8] hover:bg-[#2C74C9] text-white transition-colors disabled:opacity-60"
                >
                  {actionLoading ? "Saving..." : editingItem ? "Save Changes" : "Publish to Gallery"}
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-border text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-primary">
              Delete Gallery Project?
            </h3>
            <p className="text-xs text-text-dark/70">
              Are you sure you want to remove &ldquo;{deletingItem.title}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-text-dark hover:bg-neutral-light border border-neutral-border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-60"
              >
                {actionLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
