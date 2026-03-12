import { useState, useEffect, useCallback } from 'react';
import { userAPI } from '@/services/api';
import Card from '@/components/Card';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import ConfirmModal from '@/components/ConfirmModal';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { formatDate, getErrorMessage } from '@/utils/helpers';
import toast from 'react-hot-toast';
import { HiPencilSquare, HiTrash, HiPlus } from 'react-icons/hi2';
import { PageTransition } from '@/components/Motion';

const EmployeesPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [createModal, setCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ fullName: '', email: '', password: '' });
  const [creating, setCreating] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', leaveBalance: 20 });
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await userAPI.getAll({ page, limit: 10 });
      setUsers(data.data?.users || []);
      setTotalPages(data.data?.pages || 1);
    } catch { toast.error('Failed to fetch employees'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try { await userAPI.create(createForm); toast.success('Employee added'); setCreateModal(false); setCreateForm({ fullName: '', email: '', password: '' }); fetchUsers(); }
    catch (err) { toast.error(getErrorMessage(err)); }
    finally { setCreating(false); }
  };

  const openEdit = (u) => {
    setEditModal(u._id);
    setEditForm({ fullName: u.fullName, leaveBalance: u.leaveBalance });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await userAPI.update(editModal, editForm); toast.success('Updated'); setEditModal(null); fetchUsers(); }
    catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleteTarget.role === 'admin') {
      toast.error('Admin accounts cannot be removed');
      setDeleteTarget(null);
      return;
    }

    setDeleting(true);
    try { await userAPI.delete(deleteTarget._id); toast.success('Removed'); setDeleteTarget(null); fetchUsers(); }
    catch (err) { toast.error(getErrorMessage(err)); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'fullName', label: 'Name', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-brand-100 rounded-full flex items-center justify-center">
          <span className="text-brand-700 font-semibold text-xs">{r.fullName?.charAt(0)?.toUpperCase()}</span>
        </div>
        <div><p className="font-medium text-gray-900">{r.fullName}</p><p className="text-xs text-gray-500">{r.email}</p></div>
      </div>
    )},
    { key: 'role', label: 'Role', render: (r) => (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${r.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{r.role}</span>
    )},
    { key: 'leaveBalance', label: 'Leave Balance' },
    { key: 'dateOfJoining', label: 'Joined', render: (r) => formatDate(r.dateOfJoining) },
    { key: 'actions', label: 'Actions', render: (r) => (
      <div className="flex items-center gap-2">
        <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-50" title="Edit"><HiPencilSquare className="h-4 w-4" /></button>
        {r.role !== 'admin' && (
          <button onClick={() => setDeleteTarget(r)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50" title="Remove"><HiTrash className="h-4 w-4" /></button>
        )}
      </div>
    )},
  ];

  return (
    <PageTransition>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-950">Manage Employees</h2>
        <Button onClick={() => setCreateModal(true)}><HiPlus className="h-4 w-4 mr-1.5" />Add Employee</Button>
      </div>
      <Card><Table columns={columns} data={users} loading={loading} page={page} totalPages={totalPages} onPageChange={setPage} /></Card>

      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Add Employee">
        <form onSubmit={handleCreate} className="space-y-4">
          <FormInput label="Full Name" placeholder="John Doe" value={createForm.fullName} onChange={(e) => setCreateForm({ ...createForm, fullName: e.target.value })} required />
          <FormInput label="Email" type="email" placeholder="john@example.com" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} required />
          <FormInput label="Password" type="password" placeholder="Min 6 characters" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} required minLength={6} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => setCreateModal(false)}>Cancel</Button>
            <Button type="submit" loading={creating}>Add Employee</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!editModal} onClose={() => setEditModal(null)} title="Edit Employee">
        <form onSubmit={handleUpdate} className="space-y-4">
          <FormInput label="Full Name" value={editForm.fullName} onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })} required />
          <FormInput label="Leave Balance" type="number" min="0" value={editForm.leaveBalance} onChange={(e) => setEditForm({ ...editForm, leaveBalance: Number(e.target.value) })} required />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => setEditModal(null)}>Cancel</Button>
            <Button type="submit" loading={saving}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title="Remove Employee" confirmLabel="Remove" loading={deleting} danger
        message={`Are you sure you want to remove ${deleteTarget?.fullName}? This will permanently delete their records.`} />
    </div>
    </PageTransition>
  );
};

export default EmployeesPage;
