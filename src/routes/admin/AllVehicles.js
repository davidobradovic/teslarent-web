import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/ApplicationContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Plus, X, Upload, Pencil, Trash2, Car, Battery, Gauge, Zap, AlertTriangle, Loader2, Palette, Circle, Settings } from "lucide-react";

function AllVehicles() {
  const { vehicles, fetchVehicles } = useAppContext();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    vehicle_name: "",
    banner_image: "",
    price_per_day: "",
    tesla_code: "",
    battery_capacity_kwh: "",
    range_km: "",
    acceleration_0_100: "",
    top_speed_kmh: "",
    description: "",
    exterior_color: "",
    wheel_type: "",
    wheel_size: "",
    interior_color: ""
  });
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Predefined options
  const exteriorColors = [
    { value: 'Pearl White', label: 'Pearl White Multi-Coat', color: '#f2f2f2' },
    { value: 'Solid Black', label: 'Solid Black', color: '#000000' },
    { value: 'Midnight Silver', label: 'Midnight Silver Metallic', color: '#42464a' },
    { value: 'Deep Blue', label: 'Deep Blue Metallic', color: '#1e3a5f' },
    { value: 'Red Multi-Coat', label: 'Red Multi-Coat', color: '#a82535' },
    { value: 'Quicksilver', label: 'Quicksilver', color: '#8c8c8c' },
    { value: 'Ultra White', label: 'Ultra White', color: '#ffffff' },
  ];

  const interiorColors = [
    { value: 'All Black', label: 'All Black', color: '#1a1a1a' },
    { value: 'Black and White', label: 'Black and White', color: '#f5f5f5' },
    { value: 'Cream', label: 'Cream', color: '#f5f0e6' },
    { value: 'Walnut Decor', label: 'Walnut Wood Decor', color: '#5c4033' },
  ];

  const wheelOptions = [
    { value: '18" Aero', size: 18 },
    { value: '19" Tempest', size: 19 },
    { value: '19" Sport', size: 19 },
    { value: '20" Induction', size: 20 },
    { value: '20" Überturbine', size: 20 },
    { value: '21" Arachnid', size: 21 },
    { value: '22" Turbine', size: 22 },
  ];

  useEffect(() => {
    if (selectedCar) {
      const car = vehicles.find((veh) => veh.id === selectedCar);
      if (car) {
        setFormData({
          vehicle_name: car.vehicle_name || "",
          banner_image: car.banner_image || "",
          price_per_day: car.price_per_day || "",
          tesla_code: car.tesla_code || "",
          battery_capacity_kwh: car.battery_capacity_kwh || "",
          range_km: car.range_km || "",
          acceleration_0_100: car.acceleration_0_100 || "",
          top_speed_kmh: car.top_speed_kmh || "",
          description: car.description || "",
          exterior_color: car.exterior_color || "",
          wheel_type: car.wheel_type || "",
          wheel_size: car.wheel_size || "",
          interior_color: car.interior_color || ""
        });
        setSelectedImage(car.banner_image || null);
      }
    }
  }, [selectedCar, vehicles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWheelChange = (e) => {
    const selectedWheel = wheelOptions.find(w => w.value === e.target.value);
    setFormData({
      ...formData,
      wheel_type: e.target.value,
      wheel_size: selectedWheel ? selectedWheel.size : ""
    });
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // CREATE Vehicle
  const createVehicle = async () => {
    setIsLoading(true);
    try {
      const newFormData = new FormData();
      newFormData.append('vehicle_name', formData.vehicle_name);
      newFormData.append('price_per_day', parseFloat(formData.price_per_day).toFixed(2));
      newFormData.append('tesla_code', formData.tesla_code);
      newFormData.append('battery_capacity_kwh', parseInt(formData.battery_capacity_kwh, 10) || 0);
      newFormData.append('range_km', parseInt(formData.range_km, 10) || 0);
      newFormData.append('acceleration_0_100', parseFloat(formData.acceleration_0_100).toFixed(2) || 0);
      newFormData.append('top_speed_kmh', parseInt(formData.top_speed_kmh, 10) || 0);
      newFormData.append('description', formData.description || '');
      // New fields
      newFormData.append('exterior_color', formData.exterior_color || '');
      newFormData.append('wheel_type', formData.wheel_type || '');
      newFormData.append('wheel_size', parseInt(formData.wheel_size, 10) || 0);
      newFormData.append('interior_color', formData.interior_color || '');

      if (imageFile) {
        newFormData.append('banner_image', imageFile);
      }

      const response = await fetch('https://tesla.movelink.org/vehicles', {
        method: 'POST',
        body: newFormData
      });

      if (!response.ok) throw new Error('Failed to create vehicle');

      toast.success(t('admin.vehicleCreated'), { position: "top-right", autoClose: 3000 });
      resetForm();
      setModalOpen(false);
      if (fetchVehicles) fetchVehicles();

    } catch (error) {
      console.error('Error creating vehicle:', error);
      toast.error(t('admin.vehicleCreateFailed'), { position: "top-right", autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE Vehicle
  const updateVehicle = async () => {
    if (!selectedCar) return;

    setIsLoading(true);
    try {
      const updateFormData = new FormData();
      updateFormData.append('vehicle_name', formData.vehicle_name);
      updateFormData.append('price_per_day', parseFloat(formData.price_per_day).toFixed(2));
      updateFormData.append('tesla_code', formData.tesla_code);
      updateFormData.append('battery_capacity_kwh', parseInt(formData.battery_capacity_kwh, 10) || 0);
      updateFormData.append('range_km', parseInt(formData.range_km, 10) || 0);
      updateFormData.append('acceleration_0_100', parseFloat(formData.acceleration_0_100).toFixed(2) || 0);
      updateFormData.append('top_speed_kmh', parseInt(formData.top_speed_kmh, 10) || 0);
      updateFormData.append('description', formData.description || '');
      // New fields
      updateFormData.append('exterior_color', formData.exterior_color || '');
      updateFormData.append('wheel_type', formData.wheel_type || '');
      updateFormData.append('wheel_size', parseInt(formData.wheel_size, 10) || 0);
      updateFormData.append('interior_color', formData.interior_color || '');

      if (imageFile) {
        updateFormData.append('banner_image', imageFile);
      }

      const response = await fetch(`https://tesla.movelink.org/vehicles/${selectedCar}`, {
        method: 'PUT',
        body: updateFormData
      });

      if (!response.ok) throw new Error('Failed to update vehicle');

      toast.success(t('admin.vehicleUpdated'), { position: "top-right", autoClose: 3000 });
      resetForm();
      setModalOpen(false);
      if (fetchVehicles) fetchVehicles();

    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast.error(t('admin.vehicleUpdateFailed'), { position: "top-right", autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE Vehicle
  const deleteVehicle = async () => {
    if (!vehicleToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`https://tesla.movelink.org/vehicles/${vehicleToDelete.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete vehicle');

      toast.success(t('admin.vehicleDeleted'), { position: "top-right", autoClose: 3000 });
      setDeleteModalOpen(false);
      setVehicleToDelete(null);
      if (fetchVehicles) fetchVehicles();

    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error(t('admin.vehicleDeleteFailed'), { position: "top-right", autoClose: 3000 });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = () => {
    if (selectedCar) {
      updateVehicle();
    } else {
      createVehicle();
    }
  };

  const openDeleteModal = (vehicle) => {
    setVehicleToDelete(vehicle);
    setDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      vehicle_name: "",
      banner_image: "",
      price_per_day: "",
      tesla_code: "",
      battery_capacity_kwh: "",
      range_km: "",
      acceleration_0_100: "",
      top_speed_kmh: "",
      description: "",
      exterior_color: "",
      wheel_type: "",
      wheel_size: "",
      interior_color: ""
    });
    setSelectedImage(null);
    setImageFile(null);
    setSelectedCar(null);
  };

  // Get color dot for display
  const getColorDot = (colorValue, colorList) => {
    const found = colorList.find(c => c.value === colorValue);
    return found ? found.color : '#ccc';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.allVehicles')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('admin.allVehiclesSubtitle')}</p>
        </div>
        <button
          onClick={() => { setModalOpen(true); resetForm(); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg"
        >
          <Plus size={18} /> {t('admin.addVehicle')}
        </button>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((veh) => (
          <div key={veh.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Image */}
            <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 relative">
              <img
                src={veh.banner_image}
                alt={veh.vehicle_name}
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              {/* Color badge */}
              {veh.exterior_color && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full">
                  <div
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: getColorDot(veh.exterior_color, exteriorColors) }}
                  />
                  <span className="text-xs font-medium text-gray-700">{veh.exterior_color}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{veh.vehicle_name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{veh.tesla_code}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-900">€{Number(veh.price_per_day).toLocaleString()}</span>
                  <p className="text-xs text-gray-400">/{t('admin.day')}</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Battery size={14} className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">{veh.battery_capacity_kwh} kWh</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Car size={14} className="text-green-500" />
                  <span className="text-xs font-medium text-gray-700">{veh.range_km} km</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Zap size={14} className="text-amber-500" />
                  <span className="text-xs font-medium text-gray-700">{veh.acceleration_0_100}s</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Gauge size={14} className="text-purple-500" />
                  <span className="text-xs font-medium text-gray-700">{veh.top_speed_kmh} km/h</span>
                </div>
              </div>

              {/* New fields display */}
              <div className="flex flex-wrap gap-2 mb-4">
                {veh.wheel_type && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                    <Settings size={12} /> {veh.wheel_type}
                  </span>
                )}
                {veh.interior_color && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                    <Circle
                      size={12}
                      fill={getColorDot(veh.interior_color, interiorColors)}
                      stroke={getColorDot(veh.interior_color, interiorColors)}
                    />
                    {veh.interior_color}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => { setSelectedCar(veh.id); setModalOpen(true); }}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Pencil size={15} /> {t('admin.edit')}
                </button>
                <button
                  onClick={() => openDeleteModal(veh)}
                  className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors flex items-center justify-center"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {vehicles.length === 0 && (
        <div className="text-center py-16">
          <Car size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('admin.noVehicles')}</h3>
          <p className="text-gray-500 mb-6">{t('admin.noVehiclesDesc')}</p>
          <button
            onClick={() => { setModalOpen(true); resetForm(); }}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium"
          >
            {t('admin.addVehicle')}
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCar ? t('admin.editVehicle') : t('admin.addVehicle')}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedCar ? t('admin.editVehicleDesc') : t('admin.addVehicleDesc')}
                </p>
              </div>
              <button
                onClick={() => { setModalOpen(false); resetForm(); }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div className="relative group">
                {selectedImage ? (
                  <div className="h-52 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
                    <img src={selectedImage} alt="Preview" className="max-h-full object-contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => document.getElementById('imageInput').click()}
                        className="px-5 py-2.5 bg-white text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        {t('admin.changeImage')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => document.getElementById('imageInput').click()}
                    className="h-52 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                      <Upload size={28} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">{t('admin.uploadImage')}</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              </div>

              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Car size={16} /> {t('admin.basicInfo')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.vehicleName')}
                    </label>
                    <input
                      type="text"
                      name="vehicle_name"
                      value={formData.vehicle_name}
                      onChange={handleInputChange}
                      placeholder="Tesla Model S"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.pricePerDay')} (€)
                    </label>
                    <input
                      type="number"
                      name="price_per_day"
                      value={formData.price_per_day}
                      onChange={handleInputChange}
                      placeholder="100"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.teslaCode')}
                    </label>
                    <input
                      type="text"
                      name="tesla_code"
                      value={formData.tesla_code}
                      onChange={handleInputChange}
                      placeholder="MODEL-S-2024"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Appearance Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette size={16} /> {t('admin.appearance')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Exterior Color */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.exteriorColor')}
                    </label>
                    <div className="relative">
                      <select
                        name="exterior_color"
                        value={formData.exterior_color}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="">{t('admin.selectColor')}</option>
                        {exteriorColors.map((color) => (
                          <option key={color.value} value={color.value}>{color.label}</option>
                        ))}
                      </select>
                      {formData.exterior_color && (
                        <div
                          className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: getColorDot(formData.exterior_color, exteriorColors) }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Interior Color */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.interiorColor')}
                    </label>
                    <div className="relative">
                      <select
                        name="interior_color"
                        value={formData.interior_color}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="">{t('admin.selectInterior')}</option>
                        {interiorColors.map((color) => (
                          <option key={color.value} value={color.value}>{color.label}</option>
                        ))}
                      </select>
                      {formData.interior_color && (
                        <div
                          className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: getColorDot(formData.interior_color, interiorColors) }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Wheels */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.wheels')}
                    </label>
                    <select
                      name="wheel_type"
                      value={formData.wheel_type}
                      onChange={handleWheelChange}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="">{t('admin.selectWheels')}</option>
                      {wheelOptions.map((wheel) => (
                        <option key={wheel.value} value={wheel.value}>{wheel.value}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Performance Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap size={16} /> {t('admin.performance')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.batteryCapacity')}
                    </label>
                    <input
                      type="number"
                      name="battery_capacity_kwh"
                      value={formData.battery_capacity_kwh}
                      onChange={handleInputChange}
                      placeholder="100"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.range')}
                    </label>
                    <input
                      type="number"
                      name="range_km"
                      value={formData.range_km}
                      onChange={handleInputChange}
                      placeholder="600"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.acceleration')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="acceleration_0_100"
                      value={formData.acceleration_0_100}
                      onChange={handleInputChange}
                      placeholder="3.2"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                      {t('admin.topSpeed')}
                    </label>
                    <input
                      type="number"
                      name="top_speed_kmh"
                      value={formData.top_speed_kmh}
                      onChange={handleInputChange}
                      placeholder="250"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                  {t('admin.description')}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Vehicle description..."
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => { setModalOpen(false); resetForm(); }}
                  disabled={isLoading}
                  className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {t('admin.cancel')}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 py-3.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t('admin.saving')}
                    </>
                  ) : (
                    selectedCar ? t('admin.saveChanges') : t('admin.createVehicle')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && vehicleToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={32} className="text-red-600" />
              </div>
            </div>
            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('admin.deleteVehicle')}</h3>
              <p className="text-gray-500 mb-2">{t('admin.deleteVehicleConfirm')}</p>
              <p className="font-semibold text-gray-900 bg-gray-100 py-2 px-4 rounded-lg inline-block">
                {vehicleToDelete.vehicle_name}
              </p>
              <p className="text-sm text-red-500 mt-4">{t('admin.deleteWarning')}</p>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => { setDeleteModalOpen(false); setVehicleToDelete(null); }}
                disabled={isDeleting}
                className="flex-1 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {t('admin.cancel')}
              </button>
              <button
                onClick={deleteVehicle}
                disabled={isDeleting}
                className="flex-1 py-4 text-red-600 font-semibold hover:bg-red-50 transition-colors border-l border-gray-100 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t('admin.deleting')}
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    {t('admin.delete')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllVehicles;