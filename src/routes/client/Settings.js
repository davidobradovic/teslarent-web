import React, { useState, useEffect } from 'react';
import { User, Lock, FileText, Bell, CreditCard, LogOut, Camera, Save, X, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Cookies from 'js-cookie';

const API_URL = 'https://tesla.movelink.org';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [verificationStatus, setVerificationStatus] = useState(null);

  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: ''
  });

  const [documentsData, setDocumentsData] = useState({
    id_card_number: '',
    id_front_image: null,
    id_back_image: null,
    driver_license_number: '',
    driver_license_expiry_date: '',
    driver_license_front_image: null,
    driver_license_back_image: null
  });

  const token = Cookies.get('authToken');
  const userId = Cookies.get('userId');

  useEffect(() => {
    fetchUserData();
    fetchVerificationStatus();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUser(data);
      setProfileData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        zip_code: data.zip_code || ''
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const fetchVerificationStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/users/verification-status/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setVerificationStatus(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profil uspješno ažuriran!' });
        fetchUserData();
      } else {
        setMessage({ type: 'error', text: 'Greška pri ažuriranju profila' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Greška pri ažuriranju profila' });
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentsData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleUploadID = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('id_card_number', documentsData.id_card_number);
    if (documentsData.id_front_image) formData.append('id_front_image', documentsData.id_front_image);
    if (documentsData.id_back_image) formData.append('id_back_image', documentsData.id_back_image);

    try {
      const response = await fetch(`${API_URL}/users/upload-id`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Lična karta uspješno uploadovana!' });
        fetchVerificationStatus();
      } else {
        setMessage({ type: 'error', text: 'Greška pri uploadu' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Greška pri uploadu' });
    } finally {
      setSaving(false);
    }
  };

  const handleUploadDriverLicense = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('driver_license_number', documentsData.driver_license_number);
    formData.append('driver_license_expiry_date', documentsData.driver_license_expiry_date);
    if (documentsData.driver_license_front_image) formData.append('driver_license_front_image', documentsData.driver_license_front_image);
    if (documentsData.driver_license_back_image) formData.append('driver_license_back_image', documentsData.driver_license_back_image);

    try {
      const response = await fetch(`${API_URL}/users/upload-driver-license`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Vozačka dozvola uspješno uploadovana!' });
        fetchVerificationStatus();
      } else {
        setMessage({ type: 'error', text: 'Greška pri uploadu' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Greška pri uploadu' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  const getVerificationBadge = (status) => {
    const badges = {
      verified: { icon: CheckCircle, text: 'Verifikovan', color: 'text-green-600 bg-green-50 border-green-200' },
      pending: { icon: Clock, text: 'Na čekanju', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
      rejected: { icon: AlertCircle, text: 'Odbijen', color: 'text-red-600 bg-red-50 border-red-200' },
      unverified: { icon: AlertCircle, text: 'Neverifikovan', color: 'text-gray-600 bg-gray-50 border-gray-200' }
    };

    const badge = badges[status] || badges.unverified;
    const Icon = badge.icon;

    return (
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${badge.color}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-semibold">{badge.text}</span>
      </div>
    );
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'documents', label: 'Dokumenti', icon: FileText },
    { id: 'security', label: 'Sigurnost', icon: Lock },
    { id: 'notifications', label: 'Notifikacije', icon: Bell }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl font-semibold">Učitavanje...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Postavke</h1>
              <p className="text-gray-600 mt-1">Upravljajte svojim nalogom i preferencijama</p>
            </div>
            {verificationStatus && (
              <div>
                {getVerificationBadge(verificationStatus.verification_status || 'unverified')}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-8 border border-red-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Odjavi se</span>
              </button>
            </nav>
          </div>

          <div className="flex-1">
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Informacije o profilu</h2>
                  <p className="text-gray-600">Ažurirajte svoje lične podatke</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Puno ime</label>
                      <input
                        type="text"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Adresa</label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Grad</label>
                      <input
                        type="text"
                        value={profileData.city}
                        onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Država/Pokrajina</label>
                      <input
                        type="text"
                        value={profileData.state}
                        onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Država</label>
                      <input
                        type="text"
                        value={profileData.country}
                        onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Poštanski broj</label>
                      <input
                        type="text"
                        value={profileData.zip_code}
                        onChange={(e) => setProfileData(prev => ({ ...prev, zip_code: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleProfileUpdate}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 shadow-md"
                  >
                    <Save className="w-5 h-5" />
                    {saving ? 'Čuvanje...' : 'Sačuvaj promjene'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-8">
                {verificationStatus && (
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Status verifikacije</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <p className="font-semibold text-gray-900">Lična karta</p>
                          <p className="text-sm text-gray-600">
                            {verificationStatus.id_verified ? 'Verifikovan' : 'Neverifikovan'}
                          </p>
                        </div>
                        {verificationStatus.id_verified ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <p className="font-semibold text-gray-900">Vozačka dozvola</p>
                          <p className="text-sm text-gray-600">
                            {verificationStatus.driver_license_verified ? 'Verifikovan' : 'Neverifikovan'}
                          </p>
                        </div>
                        {verificationStatus.driver_license_verified ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                      {verificationStatus.verification_notes && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm font-semibold text-yellow-800 mb-1">Napomena:</p>
                          <p className="text-sm text-yellow-700">{verificationStatus.verification_notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Lična karta</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Broj lične karte</label>
                      <input
                        type="text"
                        value={documentsData.id_card_number}
                        onChange={(e) => setDocumentsData(prev => ({ ...prev, id_card_number: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Prednja strana</label>
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all bg-gray-50 hover:bg-blue-50">
                          <Camera className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600 font-medium">
                            {documentsData.id_front_image ? documentsData.id_front_image.name : 'Klikni za upload'}
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            onChange={(e) => handleFileChange(e, 'id_front_image')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Zadnja strana</label>
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all bg-gray-50 hover:bg-blue-50">
                          <Camera className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600 font-medium">
                            {documentsData.id_back_image ? documentsData.id_back_image.name : 'Klikni za upload'}
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            onChange={(e) => handleFileChange(e, 'id_back_image')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleUploadID}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 shadow-md"
                    >
                      <Save className="w-5 h-5" />
                      {saving ? 'Upload...' : 'Upload dokumenta'}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vozačka dozvola</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Broj vozačke dozvole</label>
                        <input
                          type="text"
                          value={documentsData.driver_license_number}
                          onChange={(e) => setDocumentsData(prev => ({ ...prev, driver_license_number: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Datum isteka</label>
                        <input
                          type="date"
                          value={documentsData.driver_license_expiry_date}
                          onChange={(e) => setDocumentsData(prev => ({ ...prev, driver_license_expiry_date: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Prednja strana</label>
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all bg-gray-50 hover:bg-blue-50">
                          <Camera className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600 font-medium">
                            {documentsData.driver_license_front_image ? documentsData.driver_license_front_image.name : 'Klikni za upload'}
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            onChange={(e) => handleFileChange(e, 'driver_license_front_image')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Zadnja strana</label>
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all bg-gray-50 hover:bg-blue-50">
                          <Camera className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600 font-medium">
                            {documentsData.driver_license_back_image ? documentsData.driver_license_back_image.name : 'Klikni za upload'}
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            onChange={(e) => handleFileChange(e, 'driver_license_back_image')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleUploadDriverLicense}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 shadow-md"
                    >
                      <Save className="w-5 h-5" />
                      {saving ? 'Upload...' : 'Upload dokumenta'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sigurnost naloga</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Email adresa</h3>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Promjena lozinke</h3>
                    <p className="text-gray-600 text-sm mb-4">Kontaktirajte podršku za promjenu lozinke</p>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm">
                      Kontaktiraj podršku
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Postavke notifikacija</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Email notifikacije za rezervacije', desc: 'Primaj obavještenja o novim rezervacijama' },
                    { label: 'Podsjetnici za nadolazeće rezervacije', desc: 'Primaj podsjetnik 24h prije početka' },
                    { label: 'Marketing obavještenja', desc: 'Specijalne ponude i novosti' },
                    { label: 'SMS notifikacije', desc: 'Primaj važna obavještenja putem SMS-a' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-full h-full bg-gray-300 peer-checked:bg-blue-600 rounded-full peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;