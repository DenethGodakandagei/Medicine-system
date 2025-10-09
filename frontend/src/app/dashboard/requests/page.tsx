"use client";

import { useContext, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
} from "lucide-react";
import API from "@/services/api";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Medicine {
  _id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  dosage: string;
  price: number;
  stock: number;
  expiryDate: string;
  prescriptionRequired: boolean;
  image: string;
}

interface Pharmacist {
  _id: string;
  pharmacyName: string;
  licenseNumber: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Request {
  _id: string;
  medicineId: Medicine;
  pharmacistId: Pharmacist;
  userId?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  quantity: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function RequestedMedicinePage() {
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const { accessToken, user } = useContext(AuthContext);
  const role = user?.role || "user";

  const requestedRole = role === "pharmacist" ? "pharmacist" : "user";

  useEffect(() => {
    if (!accessToken) return;

    const fetchRequests = async () => {
      try {
        const res = await API.get(`/request/${requestedRole}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setRequests(res.data.data);
      } catch (error) {
        console.error("Error fetching requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [requestedRole, accessToken]);

  const handleStatusUpdate = (updatedRequest: Request) => {
    setRequests((prev) =>
      prev.map((r) => (r._id === updatedRequest._id ? updatedRequest : r))
    );
  };

  if (loading) return <p className="p-4">Loading your requests...</p>;

  return (
    <div className="p-6">
      <button
        className="cursor-pointer mb-5 flex items-center gap-1"
        onClick={() => router.push("/dashboard")}
      >
        <ChevronLeft size={18} />
        Back
      </button>
      <h1 className="text-xl font-semibold mb-4">Requested Medicines</h1>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 text-sm font-medium text-gray-700 px-4 py-2">
          <div className="col-span-4">Medicine</div>
          {requestedRole === "user" ? (
            <div className="col-span-3">Pharmacy</div>
          ) : (
            <div className="col-span-3">Requested By</div>
          )}
          <div className="col-span-1 text-center">Qty</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Requested</div>
        </div>
        <div className="divide-y text-sm">
          {requests.map((req) => (
            <RequestRow
              key={req._id}
              request={req}
              role={requestedRole}
              accessToken={accessToken}
              onUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface RequestRowProps {
  request: Request;
  role: string;
  accessToken: string | null;
  onUpdate: (updatedRequest: Request) => void;
}

function RequestRow({ request, role, accessToken, onUpdate }: RequestRowProps) {
  const {
    medicineId: med,
    pharmacistId: pharm,
    userId,
    quantity,
    status: initialStatus,
    createdAt,
    _id,
  } = request;

  const [status, setStatus] = useState<Request["status"]>(initialStatus);
  const [loading, setLoading] = useState(false);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleStatusChange = async (newStatus: Request["status"]) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const res = await API.put(
        `/request/${_id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setStatus(res.data.data.status);
      onUpdate(res.data.data);
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-50 transition">
      {/* Medicine */}
      <div className="col-span-4 flex items-center gap-3">
        <img
          src={med?.image || "/no-image.png"}
          alt={med?.name}
          className="w-10 h-10 rounded border object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">{med?.name}</p>
          <p className="text-xs text-gray-500">
            {med?.brand} • {med?.dosage}
          </p>
        </div>
      </div>

      {/* Pharmacy / Requested By */}
      <div className="col-span-3">
        {role === "user" ? (
          <>
            <p className="font-medium">{pharm?.pharmacyName}</p>
            <p className="text-xs text-gray-500">{pharm?.user?.email}</p>
          </>
        ) : (
          <>
            <p className="font-medium">
              {userId?.firstName} {userId?.lastName}
            </p>
            <p className="text-xs text-gray-500">{userId?.email}</p>
          </>
        )}
      </div>

      {/* Quantity */}
      <div className="col-span-1 text-center font-medium">{quantity}</div>

      {/* Status */}
      <div className="col-span-2 flex justify-center">
        {role === "pharmacist" ? (
          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value as Request["status"])
            }
            disabled={loading}
            className="border rounded px-2 py-1 text-xs font-medium text-gray-700"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        ) : (
          <StatusBadge status={status} />
        )}
      </div>

      {/* Date */}
      <div className="col-span-2 flex items-center justify-end text-xs text-gray-500">
        <Clock size={14} className="mr-1" />
        {formattedDate}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Request["status"] }) {
  const base =
    "flex items-center text-xs px-2 py-0.5 rounded-full border font-medium";

  if (status === "approved") {
    return (
      <span className={`${base} border-green-200 text-green-700 bg-green-50`}>
        <CheckCircle size={12} className="mr-1" />
        Approved
      </span>
    );
  }
  if (status === "rejected") {
    return (
      <span className={`${base} border-red-200 text-red-700 bg-red-50`}>
        <XCircle size={12} className="mr-1" />
        Rejected
      </span>
    );
  }
  return (
    <span className={`${base} border-yellow-200 text-yellow-700 bg-yellow-50`}>
      <AlertCircle size={12} className="mr-1" />
      Pending
    </span>
  );
}
