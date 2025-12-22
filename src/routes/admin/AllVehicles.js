// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../../context/ApplicationContext";
// import { toast } from "react-toastify";

// function AllVehicles() {
//   const { vehicles } = useAppContext();

//   const [formData, setFormData] = useState({
//     vehicle_name: "",
//     banner_image: "",
//     price_per_day: null,
//     tesla_code: "",
//     battery_capacity_kwh: null,
//     range_km: null,
//     acceleration_0_100: null,
//     top_speed_kmh: null,
//     description: ""
//   });

//   const [selectedCar, setSelectedCar] = useState(null);
//   const [modalOpen, setModalOpen] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     if (selectedCar) {
//       const car = vehicles.find((veh) => veh.id === selectedCar);
//       if (car) {
//         setFormData({
//           vehicle_name: car.vehicle_name || "",
//           banner_image: car.banner_image || "",
//           price_per_day: car.price_per_day || null,
//           tesla_code: car.tesla_code || "",
//           battery_capacity_kwh: car.battery_capacity_kwh || null,
//           range_km: car.range_km || null,
//           acceleration_0_100: car.acceleration_0_100 || null,
//           top_speed_kmh: car.top_speed_kmh || null,
//           description: car.description || ""
//         });
//       }
//     }
//   }, [selectedCar, vehicles]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//       setFormData((prev) => ({ ...prev, banner_image: file }));
//     }
//   };

//   const openFileSelector = () => {
//     document.getElementById('imageInput').click();
//   };

//   const sendVehicleData = async () => {
//     try {
//       const newFormData = new FormData();

//       // Append form data (including file)
//       newFormData.append('vehicle_name', formData.vehicle_name);
//       newFormData.append('price_per_day', parseFloat(formData.price_per_day).toFixed(2)); // Convert to decimal (float) with 2 decimal places
//       newFormData.append('tesla_code', formData.tesla_code);

//       // Convert to integer values
//       newFormData.append('battery_capacity_kwh', parseInt(formData.battery_capacity_kwh, 10));
//       newFormData.append('range_km', parseInt(formData.range_km, 10));
//       newFormData.append('acceleration_0_100', parseFloat(formData.acceleration_0_100).toFixed(2)); // Convert to decimal (float)
//       newFormData.append('top_speed_kmh', parseInt(formData.top_speed_kmh, 10));

//       newFormData.append('description', formData.description);

//       // Check if there is a banner image (file) and append it
//       if (formData.banner_image) {
//         newFormData.append('banner_image', formData.banner_image);
//       }

//       const response = await fetch('https://tesla.movelink.org/vehicles', {
//         method: 'POST',
//         body: newFormData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create vehicle');
//       }

//       toast.success('You created vehicle successfuly!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });

//       setFormData({
//         vehicle_name: '',
//         banner_image: '',
//         price_per_day: null,
//         tesla_code: '',
//         battery_capacity_kwh: null,
//         range_km: null,
//         acceleration_0_100: null,
//         top_speed_kmh: null,
//         description: '',
//       });

//       setModalOpen(null);
//     } catch (error) {
//       toast.error('Failed while creating new car!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",

//       });
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">All vehicles</h1>
//         <button className="bg-blue-500 text-white rounded text-sm p-3" onClick={() => {
//           setModalOpen(true);
//           setSelectedCar(null)
//         }}>Create new vehicle</button>
//       </div>
//       <table className="w-full border">
//         <thead className="w-full">
//           <tr className="w-full bg-[#F7F7F7]">
//             <th className="text-sm text-left p-3 border-r">ID</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Banner</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Vehicle name</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Price per day</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Tesla code</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Battery capacity</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Range</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Acceleration</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Top speed</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Description</th>
//             <th className="text-sm text-left p-3 border-r min-w-[140px]">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vehicles.map((veh) => (
//             <tr className="w-full border-b" key={veh.id}>
//               <td className="text-sm text-left p-3 border-r font-bold">{veh.id}</td>
//               <td className="text-sm text-left p-3 border-r">
//                 <img src={veh.banner_image} style={{ height: 20 }} alt="" />
//               </td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.vehicle_name}</td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.price_per_day} din</td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.tesla_code}</td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.battery_capacity_kwh} kwh</td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.range_km} km</td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.acceleration_0_100} s</td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.top_speed_kmh} km/h</td>
//               <td className="text-sm text-left p-3 border-r min-w-[140px]">{veh.description}</td>
//               <td className="text-xs flex items-center justify-center gap-2 text-left p-2 border-r min-w-[140px]">
//                 <button
//                   onClick={() => {
//                     setSelectedCar(veh.id)
//                     setModalOpen(true)
//                   }}
//                   className="bg-blue-100 text-blue-600 p-2 rounded-full"
//                 >
//                   Update
//                 </button>
//                 <button className="bg-red-100 text-red-500 p-2 rounded-full">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {modalOpen && (
//         <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-25 flex items-center justify-center p-6">
//           <div className="w-full max-w-screen-md bg-white p-4 rounded">
//             <h1 className="text-2xl font-bold text-center my-8">Update vehicle</h1>
//             {
//               formData.banner_image !== "" ? (
//                 <div className="relative group">
//                   <img className="w-full object-cover h-[200px]" src={selectedImage ? selectedImage : formData.banner_image} alt="Banner" />
//                   <div className="absolute inset-0 bg-white bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button onClick={openFileSelector} className="bg-blue-500 text-white px-4 py-2 rounded">
//                       Update Image
//                     </button>
//                   </div>
//                 </div>
//               ) : selectedImage && selectedImage.trim() !== "" ? (
//                 <img className="w-full object-cover h-[200px]" src={selectedImage} alt="Selected" />
//               ) : (
//                 <div className="w-full h-[100px] bg-gray-100 flex items-center justify-center mb-4">
//                   <button onClick={openFileSelector} className="p-3 rounded bg-blue-100 text-blue-500 text-sm">
//                     Choose banner
//                   </button>
//                 </div>
//               )
//             }
//             <div className="w-full gap-2 grid grid-cols-1 md:grid-cols-2 mt-3">
//               <label className="text-xs pb-1 block">
//                 Vehicle Name
//                 <input
//                   type="text"
//                   name="vehicle_name"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.vehicle_name}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="text-xs pb-1 block">
//                 Price per Day
//                 <input
//                   type="number"
//                   name="price_per_day"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.price_per_day}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="text-xs pb-1 block">
//                 Tesla Code
//                 <input
//                   type="text"
//                   name="tesla_code"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.tesla_code}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="text-xs pb-1 block">
//                 Battery Capacity (kWh)
//                 <input
//                   type="number"
//                   name="battery_capacity_kwh"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.battery_capacity_kwh}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="text-xs pb-1 block">
//                 Range (km)
//                 <input
//                   type="number"
//                   name="range_km"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.range_km}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="text-xs pb-1 block">
//                 Acceleration (0-100)
//                 <input
//                   type="number"
//                   name="acceleration_0_100"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.acceleration_0_100}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="text-xs pb-1 block">
//                 Top Speed (km/h)
//                 <input
//                   type="number"
//                   name="top_speed_kmh"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.top_speed_kmh}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="text-xs pb-1 block md:col-span-2">
//                 Description
//                 <input
//                   type="text"
//                   name="description"
//                   className="bg-gray-100 p-3 rounded outline-none w-full"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <input
//                 id='imageInput'
//                 type='file'
//                 accept='image/*'
//                 className='hidden'
//                 onChange={handleImageSelect}
//               />
//             </div>
//             <div className="action-buttons grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
//               <button
//                 onClick={() => {
//                   setSelectedCar(null)
//                   setModalOpen(null)
//                 }}
//                 className="p-3 rounded bg-gray-100 text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   sendVehicleData()
//                 }}
//                 className="p-3 rounded text-sm bg-[#59c23d] text-white"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllVehicles;

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/ApplicationContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Plus, X, Upload, Pencil, Trash2, Car, Battery, Gauge, Zap } from "lucide-react";

function AllVehicles() {
  const { vehicles } = useAppContext();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ vehicle_name: "", banner_image: "", price_per_day: null, tesla_code: "", battery_capacity_kwh: null, range_km: null, acceleration_0_100: null, top_speed_kmh: null, description: "" });
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedCar) {
      const car = vehicles.find((veh) => veh.id === selectedCar);
      if (car) setFormData({ vehicle_name: car.vehicle_name || "", banner_image: car.banner_image || "", price_per_day: car.price_per_day || null, tesla_code: car.tesla_code || "", battery_capacity_kwh: car.battery_capacity_kwh || null, range_km: car.range_km || null, acceleration_0_100: car.acceleration_0_100 || null, top_speed_kmh: car.top_speed_kmh || null, description: car.description || "" });
    }
  }, [selectedCar, vehicles]);

  const handleInputChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };
  const handleImageSelect = (event) => { const file = event.target.files[0]; if (file) { setSelectedImage(URL.createObjectURL(file)); setFormData((prev) => ({ ...prev, banner_image: file })); } };

  const sendVehicleData = async () => {
    try {
      const newFormData = new FormData();
      newFormData.append('vehicle_name', formData.vehicle_name);
      newFormData.append('price_per_day', parseFloat(formData.price_per_day).toFixed(2));
      newFormData.append('tesla_code', formData.tesla_code);
      newFormData.append('battery_capacity_kwh', parseInt(formData.battery_capacity_kwh, 10));
      newFormData.append('range_km', parseInt(formData.range_km, 10));
      newFormData.append('acceleration_0_100', parseFloat(formData.acceleration_0_100).toFixed(2));
      newFormData.append('top_speed_kmh', parseInt(formData.top_speed_kmh, 10));
      newFormData.append('description', formData.description);
      if (formData.banner_image) newFormData.append('banner_image', formData.banner_image);
      const response = await fetch('https://tesla.movelink.org/vehicles', { method: 'POST', body: newFormData });
      if (!response.ok) throw new Error('Failed');
      toast.success(t('admin.vehicleCreated'), { position: "top-right", autoClose: 5000 });
      setFormData({ vehicle_name: '', banner_image: '', price_per_day: null, tesla_code: '', battery_capacity_kwh: null, range_km: null, acceleration_0_100: null, top_speed_kmh: null, description: '' });
      setModalOpen(false);
    } catch (error) {
      toast.error(t('admin.vehicleCreateFailed'), { position: "top-right", autoClose: 5000 });
    }
  };

  const resetForm = () => { setFormData({ vehicle_name: "", banner_image: "", price_per_day: null, tesla_code: "", battery_capacity_kwh: null, range_km: null, acceleration_0_100: null, top_speed_kmh: null, description: "" }); setSelectedImage(null); setSelectedCar(null); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{t('admin.allVehicles')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('admin.allVehiclesSubtitle')}</p>
        </div>
        <button onClick={() => { setModalOpen(true); resetForm(); }} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={18} /> {t('admin.addVehicle')}
        </button>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((veh) => (
          <div key={veh.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gray-50 flex items-center justify-center p-4">
              <img src={veh.banner_image} alt={veh.vehicle_name} className="max-h-full object-contain" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{veh.vehicle_name}</h3>
                  <p className="text-xs text-gray-500">{veh.tesla_code}</p>
                </div>
                <span className="text-lg font-semibold text-gray-900">{veh.price_per_day?.toLocaleString()} <span className="text-xs text-gray-500">din/{t('admin.day')}</span></span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600"><Battery size={14} className="text-gray-400" />{veh.battery_capacity_kwh} kWh</div>
                <div className="flex items-center gap-2 text-xs text-gray-600"><Car size={14} className="text-gray-400" />{veh.range_km} km</div>
                <div className="flex items-center gap-2 text-xs text-gray-600"><Zap size={14} className="text-gray-400" />{veh.acceleration_0_100}s 0-100</div>
                <div className="flex items-center gap-2 text-xs text-gray-600"><Gauge size={14} className="text-gray-400" />{veh.top_speed_kmh} km/h</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setSelectedCar(veh.id); setModalOpen(true); }} className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5">
                  <Pencil size={14} /> {t('admin.edit')}
                </button>
                <button className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{selectedCar ? t('admin.editVehicle') : t('admin.addVehicle')}</h2>
              <button onClick={() => { setModalOpen(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div className="relative group">
                {(formData.banner_image || selectedImage) ? (
                  <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                    <img src={selectedImage || formData.banner_image} alt="Preview" className="max-h-full object-contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => document.getElementById('imageInput').click()} className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg">{t('admin.changeImage')}</button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => document.getElementById('imageInput').click()} className="h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">{t('admin.uploadImage')}</p>
                  </div>
                )}
                <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'vehicle_name', label: t('admin.vehicleName'), type: 'text', span: 2 },
                  { name: 'price_per_day', label: t('admin.pricePerDay'), type: 'number' },
                  { name: 'tesla_code', label: t('admin.teslaCode'), type: 'text' },
                  { name: 'battery_capacity_kwh', label: t('admin.batteryCapacity'), type: 'number' },
                  { name: 'range_km', label: t('admin.range'), type: 'number' },
                  { name: 'acceleration_0_100', label: t('admin.acceleration'), type: 'number' },
                  { name: 'top_speed_kmh', label: t('admin.topSpeed'), type: 'number' },
                  { name: 'description', label: t('admin.description'), type: 'text', span: 2 },
                ].map((field) => (
                  <div key={field.name} className={field.span === 2 ? 'md:col-span-2' : ''}>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wider">{field.label}</label>
                    <input type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 transition-colors" />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button onClick={() => { setModalOpen(false); resetForm(); }} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">{t('admin.cancel')}</button>
                <button onClick={sendVehicleData} className="flex-1 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-lg transition-colors">{selectedCar ? t('admin.saveChanges') : t('admin.createVehicle')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllVehicles;