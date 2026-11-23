import React from 'react';
import { X, Mail, Phone, Calendar, Building, Briefcase, Clock, ShieldCheck } from 'lucide-react';

const getInitials = (name) => {
  if (!name) return 'EM';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const EmployeeDetailsModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  const initials = getInitials(employee.name);
  const isActive = employee.status === 'Active';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden transform transition-all">
        
        {/* Header Cover & Close Button */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-28 relative p-4 flex justify-end">
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Card Info */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar */}
          <div className="-mt-12 mb-4 flex justify-between items-end">
            <div className="h-20 w-20 rounded-2xl bg-white p-1.5 shadow-md">
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-inner">
                {initials}
              </div>
            </div>
            
            {/* Status Pill */}
            {isActive ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                Active Employee
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 mb-1">
                <span className="h-2 w-2 rounded-full bg-slate-400 mr-2"></span>
                Inactive Employee
              </span>
            )}
          </div>

          {/* Name & Role */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">{employee.name}</h3>
            <p className="text-sm font-medium text-blue-600">{employee.designation}</p>
            <p className="text-xs text-slate-400 mt-0.5">Department: {employee.department}</p>
          </div>

          {/* Detail List */}
          <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm">
            <div className="flex items-center text-slate-700">
              <Mail className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
              <span className="text-xs text-slate-400 w-24">Email:</span>
              <a href={`mailto:${employee.email}`} className="text-xs font-medium text-blue-600 hover:underline truncate">
                {employee.email}
              </a>
            </div>

            <div className="flex items-center text-slate-700">
              <Phone className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
              <span className="text-xs text-slate-400 w-24">Phone:</span>
              <span className="text-xs font-medium text-slate-800">{employee.phone}</span>
            </div>

            <div className="flex items-center text-slate-700">
              <Building className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
              <span className="text-xs text-slate-400 w-24">Department:</span>
              <span className="text-xs font-medium text-slate-800">{employee.department}</span>
            </div>

            <div className="flex items-center text-slate-700">
              <Briefcase className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
              <span className="text-xs text-slate-400 w-24">Designation:</span>
              <span className="text-xs font-medium text-slate-800">{employee.designation}</span>
            </div>

            <div className="flex items-center text-slate-700">
              <Calendar className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
              <span className="text-xs text-slate-400 w-24">Joining Date:</span>
              <span className="text-xs font-medium text-slate-800">{formatDate(employee.joiningDate)}</span>
            </div>

            {employee.createdAt && (
              <div className="flex items-center text-slate-700">
                <Clock className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
                <span className="text-xs text-slate-400 w-24">Registered:</span>
                <span className="text-xs text-slate-500">{formatDate(employee.createdAt)}</span>
              </div>
            )}
          </div>

          {/* Close Action */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
