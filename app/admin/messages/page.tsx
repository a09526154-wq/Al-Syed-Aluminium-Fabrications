"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
} from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<MessageItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(data.messages);
      } else {
        setError(data.error || "Failed to load messages");
      }
    } catch (err) {
      setError("Network error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async () => {
    if (!deletingMessage) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/messages?id=${deletingMessage.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setDeletingMessage(null);
      if (selectedMessage?.id === deletingMessage.id) setSelectedMessage(null);
      fetchMessages();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting message");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-border shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-primary">
            Contact Messages Inbox
          </h2>
          <p className="text-xs text-text-dark/60 mt-1">
            General inquiries submitted from the Contact Us page.
          </p>
        </div>
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

      {/* Messages Table */}
      <div className="bg-white rounded-2xl border border-neutral-border shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#1E5FA8] mx-auto mb-2" />
            <p className="text-xs text-text-dark/60">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-text-dark/60 text-xs">
            No contact messages found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light/70 border-b border-neutral-border text-text-dark/70 font-bold uppercase">
                <tr>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Message Snippet</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Received Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-border">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-neutral-light/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <td className="p-4">
                      <div className="font-bold text-primary">{msg.name}</div>
                      <div className="text-[11px] text-text-dark/60">
                        {msg.email}
                      </div>
                      {msg.phone && (
                        <div className="text-[10px] text-[#1E5FA8] font-mono">
                          {msg.phone}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-text-dark/80 max-w-sm truncate">
                      {msg.message}
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={msg.status}
                        onChange={(e) => handleStatusChange(msg.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border font-mono ${
                          msg.status === "new"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="replied">Replied</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-text-dark/50 text-[11px]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className="p-4 text-right space-x-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="p-1.5 rounded-lg text-[#1E5FA8] hover:bg-blue-50 transition-colors"
                        title="View Full Message"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingMessage(msg)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-border animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E5FA8]">
                  Contact Message
                </span>
                <h3 className="text-lg font-bold text-primary mt-0.5">
                  {selectedMessage.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg hover:bg-neutral-light text-text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4 text-xs">
              <div className="bg-neutral-light p-4 rounded-xl space-y-2 border border-neutral-border">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-[#1E5FA8] hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </p>
                {selectedMessage.phone && (
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="text-[#1E5FA8] hover:underline"
                    >
                      {selectedMessage.phone}
                    </a>
                  </p>
                )}
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedMessage.createdAt).toLocaleString("en-PK")}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark mb-1">
                  Message Content
                </h4>
                <div className="p-4 bg-neutral-light rounded-xl border border-neutral-border text-text-dark/90 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-border flex items-center justify-between">
              <button
                onClick={() => setDeletingMessage(selectedMessage)}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Delete Message
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Inquiring with Al Syed Aluminium Fabrications`}
                  className="inline-flex items-center space-x-1.5 bg-[#1E5FA8] hover:bg-[#2C74C9] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deletingMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-border text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-primary">
              Delete Contact Message?
            </h3>
            <p className="text-xs text-text-dark/70">
              Are you sure you want to delete this message from &ldquo;{deletingMessage.name}&rdquo;?
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingMessage(null)}
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
