"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganization } from "@/lib/api";

interface AddOrganizationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AddOrganizationModal({ onClose, onSuccess }: AddOrganizationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationCode: "",
    description: "",
    address: "",
    category: "",
    availableCounters: 1,
    waitTime: 10,
    distance: "1.0",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=org",
    active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOrganization(formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to create organization", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-2xl w-full max-w-lg p-6 relative border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Register Organization</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Name</Label>
              <Input
                id="organizationName"
                required
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizationCode">Code (Unique)</Label>
              <Input
                id="organizationCode"
                required
                value={formData.organizationCode}
                onChange={(e) => setFormData({ ...formData, organizationCode: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availableCounters">Number of Counters</Label>
                <Input
                  id="availableCounters"
                  type="number"
                  min="1"
                  required
                  value={formData.availableCounters}
                  onChange={(e) => setFormData({ ...formData, availableCounters: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waitTime">Est. Wait Time (mins)</Label>
                <Input
                  id="waitTime"
                  type="number"
                  min="1"
                  required
                  value={formData.waitTime}
                  onChange={(e) => setFormData({ ...formData, waitTime: parseInt(e.target.value) })}
                />
              </div>
            </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Organization"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
