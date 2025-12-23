import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaCar,
  FaCheck,
  FaTimes,
  FaEye,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import Cookies from 'js-cookie';


function SystemUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [verifyingUser, setVerifyingUser] = useState(null);

  const API_URL = "https://tesla.movelink.org";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('authToken');
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Greška pri učitavanju korisnika');
      setLoading(false);
    }
  };

  const handleViewUser = async (userId) => {
    try {
      const token = Cookies.get('authToken');
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedUser(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Greška pri učitavanju detalja korisnika');
    }
  };

  const handleVerifyDocuments = async (userId, idVerified, licenseVerified) => {
    try {
      const token = Cookies.get('authToken');
      await axios.post(
        `${API_URL}/users/verify-documents/${userId}`,
        {
          id_verified: idVerified,
          driver_license_verified: licenseVerified,
          verification_notes: verificationNotes
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Verifikacija uspešno ažurirana!');
      setVerifyingUser(null);
      setVerificationNotes('');
      fetchUsers();

      if (selectedUser && selectedUser.id === userId) {
        handleViewUser(userId);
      }
    } catch (error) {
      console.error('Error verifying documents:', error);
      toast.error('Greška pri verifikaciji dokumenata');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { bg: 'bg-green-100', text: 'text-green-800', label: 'Verifikovan' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Na čekanju' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Odbijen' },
      incomplete: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Nekompletan' }
    };

    const config = statusConfig[status] || statusConfig.incomplete;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);

    const matchesFilter =
      filterStatus === 'all' ||
      user.verification_status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upravljanje korisnicima</h1>
        <p className="text-gray-600">Pregledajte i verifikujte korisnike sistema</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pretraži po imenu, email-u ili telefonu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Svi statusi</option>
              <option value="incomplete">Nekompletni</option>
              <option value="pending">Na čekanju</option>
              <option value="verified">Verifikovani</option>
              <option value="rejected">Odbijeni</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Korisnik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontakt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokacija
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dokumenti
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.city || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{user.country || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.verification_status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {user.id_verified ? (
                        <span className="inline-flex items-center text-green-600" title="Lična karta verifikovana">
                          <FaIdCard className="mr-1" /> <FaCheck />
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-400" title="Lična karta nije verifikovana">
                          <FaIdCard className="mr-1" /> <FaTimes />
                        </span>
                      )}
                      {user.driver_license_verified ? (
                        <span className="inline-flex items-center text-green-600" title="Vozačka verifikovana">
                          <FaCar className="mr-1" /> <FaCheck />
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-400" title="Vozačka nije verifikovana">
                          <FaCar className="mr-1" /> <FaTimes />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewUser(user.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <FaEye className="mr-2" /> Detalji
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FaUser className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nema korisnika</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all'
                ? 'Nema korisnika koji odgovaraju kriterijumima pretrage.'
                : 'Trenutno nema registrovanih korisnika.'}
            </p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Detalji korisnika</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Basic Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUser className="mr-2 text-blue-600" /> Osnovni podaci
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Ime i prezime</label>
                    <p className="text-gray-900 font-semibold">{selectedUser.full_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Telefon</label>
                    <p className="text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Datum rođenja</label>
                    <p className="text-gray-900">
                      {selectedUser.date_of_birth
                        ? new Date(selectedUser.date_of_birth).toLocaleDateString('sr-RS')
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Uloga</label>
                    <p className="text-gray-900 capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Status naloga</label>
                    <p className="text-gray-900">
                      {selectedUser.is_active ? (
                        <span className="text-green-600 font-semibold">Aktivan</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Neaktivan</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-600" /> Adresa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Adresa</label>
                    <p className="text-gray-900">{selectedUser.address || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Grad</label>
                    <p className="text-gray-900">{selectedUser.city || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Regija/Država</label>
                    <p className="text-gray-900">{selectedUser.state || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Zemlja</label>
                    <p className="text-gray-900">{selectedUser.country || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Poštanski broj</label>
                    <p className="text-gray-900">{selectedUser.zip_code || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* ID Card Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaIdCard className="mr-2 text-blue-600" /> Lična karta
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Broj lične karte</label>
                      <p className="text-gray-900">{selectedUser.id_card_number || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Status verifikacije</label>
                      <p className="text-gray-900">
                        {selectedUser.id_verified ? (
                          <span className="text-green-600 font-semibold flex items-center">
                            <FaCheck className="mr-1" /> Verifikovana
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold flex items-center">
                            <FaTimes className="mr-1" /> Nije verifikovana
                          </span>
                        )}
                      </p>
                    </div>
                    {selectedUser.id_verified_at && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Datum verifikacije</label>
                        <p className="text-gray-900">
                          {new Date(selectedUser.id_verified_at).toLocaleString('sr-RS')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ID Images */}
                  {(selectedUser.id_front_image || selectedUser.id_back_image) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {selectedUser.id_front_image && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Prednja strana</label>
                          <img
                            src={`${API_URL}/${selectedUser.id_front_image}`}
                            alt="ID Front"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                          />
                        </div>
                      )}
                      {selectedUser.id_back_image && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Zadnja strana</label>
                          <img
                            src={`${API_URL}/${selectedUser.id_back_image}`}
                            alt="ID Back"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Driver License Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCar className="mr-2 text-blue-600" /> Vozačka dozvola
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Broj vozačke dozvole</label>
                      <p className="text-gray-900">{selectedUser.driver_license_number || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Status verifikacije</label>
                      <p className="text-gray-900">
                        {selectedUser.driver_license_verified ? (
                          <span className="text-green-600 font-semibold flex items-center">
                            <FaCheck className="mr-1" /> Verifikovana
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold flex items-center">
                            <FaTimes className="mr-1" /> Nije verifikovana
                          </span>
                        )}
                      </p>
                    </div>
                    {selectedUser.driver_license_expiry_date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Datum isteka</label>
                        <p className="text-gray-900">
                          {new Date(selectedUser.driver_license_expiry_date).toLocaleDateString('sr-RS')}
                        </p>
                      </div>
                    )}
                    {selectedUser.driver_license_verified_at && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Datum verifikacije</label>
                        <p className="text-gray-900">
                          {new Date(selectedUser.driver_license_verified_at).toLocaleString('sr-RS')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* License Images */}
                  {(selectedUser.driver_license_front_image || selectedUser.driver_license_back_image) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {selectedUser.driver_license_front_image && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Prednja strana</label>
                          <img
                            src={`${API_URL}/${selectedUser.driver_license_front_image}`}
                            alt="License Front"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                          />
                        </div>
                      )}
                      {selectedUser.driver_license_back_image && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Zadnja strana</label>
                          <img
                            src={`${API_URL}/${selectedUser.driver_license_back_image}`}
                            alt="License Back"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Verifikacija dokumenata</h3>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Napomene o verifikaciji
                    </label>
                    <textarea
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Unesite napomene o verifikaciji..."
                    />
                  </div>

                  {selectedUser.verification_notes && (
                    <div className="mb-4 p-3 bg-white rounded border">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Prethodne napomene:
                      </label>
                      <p className="text-sm text-gray-700">{selectedUser.verification_notes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleVerifyDocuments(selectedUser.id, true, true)}
                      className="flex-1 min-w-[200px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      <FaCheck className="mr-2" /> Verifikuj sve dokumente
                    </button>

                    <button
                      onClick={() => handleVerifyDocuments(selectedUser.id, true, false)}
                      className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Verifikuj samo ličnu kartu
                    </button>

                    <button
                      onClick={() => handleVerifyDocuments(selectedUser.id, false, true)}
                      className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Verifikuj samo vozačku
                    </button>

                    <button
                      onClick={() => handleVerifyDocuments(selectedUser.id, false, false)}
                      className="flex-1 min-w-[200px] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      <FaTimes className="mr-2" /> Odbij verifikaciju
                    </button>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Ukupan status verifikacije
                </label>
                {getStatusBadge(selectedUser.verification_status)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SystemUsers;