import React from 'react';
import { Eye, Edit2, Trash2, Calendar, Mail, Phone, UserX } from 'lucide-react';

const getDepartmentColor = (dept) => {
  switch (dept) {
    case 'Engineering':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Human Resources':
      return 'bg-pink-50 text-pink-700 border-pink-200';
    case 'Marketing':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Sales':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Finance':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Design':
      return 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200';
    case 'Operations':
      return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    case 'Product':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

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
    month: 'short',
    day: 'numeric',
  });
};

const EmployeeTable = ({
  employees,
  loading,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department & Role</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Joining Date</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                      <div className="space-y-1.5">
                        <div className="h-4 w-28 bg-slate-200 rounded"></div>
                        <div className="h-3 w-36 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      <div className="h-5 w-20 bg-slate-200 rounded-full"></div>
                      <div className="h-3 w-24 bg-slate-200 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      <div className="h-3 w-32 bg-slate-200 rounded"></div>
                      <div className="h-3 w-24 bg-slate-200 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
                      <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
                      <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <UserX className="h-8 w-8" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          No employees found
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Try adjusting your search criteria, clearing your filters, or adding a new employee to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50/80">
            <tr>
              <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Employee
              </th>
              <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Department & Role
              </th>
              <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Joining Date
              </th>
              <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {employees.map((emp) => {
              const initials = getInitials(emp.name);
              const deptColor = getDepartmentColor(emp.department);
              const isActive = emp.status === 'Active';

              return (
                <tr
                  key={emp._id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  {/* Name & Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {emp.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {emp.designation}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department & Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border w-max ${deptColor}`}>
                        {emp.department}
                      </span>
                      <span className="text-xs text-slate-500">
                        {emp.designation}
                      </span>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1 text-xs text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[170px]" title={emp.email}>
                          {emp.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span>{emp.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Joining Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{formatDate(emp.joiningDate)}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isActive ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                    <div className="flex items-center justify-end space-x-1.5">
                      {/* View Details */}
                      <button
                        onClick={() => onViewDetails(emp)}
                        title="View Employee Details"
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(emp)}
                        title="Edit Employee"
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(emp)}
                        title="Delete Employee"
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
