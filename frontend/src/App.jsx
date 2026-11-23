import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import FiltersBar from './components/FiltersBar';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import EmployeeDetailsModal from './components/EmployeeDetailsModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';

import {
  getEmployees,
  getEmployeeStats,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './api/employeeApi';

function App() {
  // Data States
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    departmentsCount: 0,
  });

  // Filter States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Loading States
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // for edit
  const [detailsEmployee, setDetailsEmployee] = useState(null); // for view details
  const [deleteTargetEmployee, setDeleteTargetEmployee] = useState(null); // for delete confirm

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    try {
      const res = await getEmployeeStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Fetch Employees with active filters
  const fetchEmployees = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setIsRefreshing(true);

    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== 'All') params.status = statusFilter;
      if (deptFilter !== 'All') params.department = deptFilter;
      if (sortBy) params.sort = sortBy;

      const res = await getEmployees(params);
      if (res.success) {
        setEmployees(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      showToast(
        err.response?.data?.message || 'Error fetching employees list',
        'error'
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [search, statusFilter, deptFilter, sortBy]);

  // Initial load
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch on filters change with debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchEmployees]);

  // Handle Manual Refresh
  const handleRefresh = async () => {
    await Promise.all([fetchStats(), fetchEmployees(true)]);
    showToast('Dashboard data updated successfully');
  };

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setDeptFilter('All');
    setSortBy('newest');
  };

  // Open Add Employee Modal
  const handleOpenAddModal = () => {
    setSelectedEmployee(null);
    setIsFormModalOpen(true);
  };

  // Open Edit Employee Modal
  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsFormModalOpen(true);
  };

  // Open Details Modal
  const handleOpenDetailsModal = (employee) => {
    setDetailsEmployee(employee);
  };

  // Open Delete Confirmation
  const handleOpenDeleteModal = (employee) => {
    setDeleteTargetEmployee(employee);
  };

  // Handle Form Submit (Create or Update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedEmployee) {
        // Update
        const res = await updateEmployee(selectedEmployee._id, formData);
        showToast(res.message || 'Employee updated successfully!');
      } else {
        // Create
        const res = await createEmployee(formData);
        showToast(res.message || 'Employee created successfully!');
      }

      setIsFormModalOpen(false);
      setSelectedEmployee(null);
      await Promise.all([fetchEmployees(true), fetchStats()]);
    } catch (err) {
      // Propagate error to form modal so it displays field/API errors
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirm
  const handleConfirmDelete = async () => {
    if (!deleteTargetEmployee) return;

    setIsDeleting(true);
    try {
      const res = await deleteEmployee(deleteTargetEmployee._id);
      showToast(res.message || 'Employee deleted successfully!');
      setDeleteTargetEmployee(null);
      await Promise.all([fetchEmployees(true), fetchStats()]);
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Failed to delete employee',
        'error'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenAddModal={handleOpenAddModal}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Employee Directory
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage, filter, and track employee records across all departments in real time.
          </p>
        </div>

        {/* Analytics / Stats Overview Cards */}
        <StatsOverview stats={stats} loading={loading && employees.length === 0} />

        {/* Filters and Search Bar */}
        <FiltersBar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleResetFilters}
          totalResults={employees.length}
        />

        {/* Employee Table */}
        <EmployeeTable
          employees={employees}
          loading={loading}
          onViewDetails={handleOpenDetailsModal}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        BMDU Technical Assessment • Employee Management System (MERN + Tailwind CSS)
      </footer>

      {/* Add / Edit Employee Modal */}
      <EmployeeModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleFormSubmit}
        employee={selectedEmployee}
        isSubmitting={isSubmitting}
      />

      {/* View Employee Details Modal */}
      <EmployeeDetailsModal
        isOpen={!!detailsEmployee}
        onClose={() => setDetailsEmployee(null)}
        employee={detailsEmployee}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTargetEmployee}
        onClose={() => setDeleteTargetEmployee(null)}
        onConfirm={handleConfirmDelete}
        employeeName={deleteTargetEmployee?.name || ''}
        isDeleting={isDeleting}
      />

      {/* Floating Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;
