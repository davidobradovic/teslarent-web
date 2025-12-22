// import { Battery, BatteryCharging, Fan, Power, Settings2 } from 'lucide-react';
// import React, { useState } from 'react';

// // JSON structure
// const controls = {
//   car_controls: {
//     "Lock Doors": { lock_doors: "bool" },
//     "Unlock Doors": { unlock_doors: "bool" },
//     "Honk Horn": { honk_horn: "bool" },
//     "Flash Lights": { flash_lights: "bool" },
//     "Open Trunk": {
//       open_trunk: { type: "string", options: ["front", "rear"] }
//     },
//     "Close Trunk": {
//       close_trunk: { type: "string", options: ["front", "rear"] }
//     },
//     "Start Vehicle": { start_vehicle: "bool" },
//     "Fold Mirrors": { fold_mirrors: "bool" },
//     "Unfold Mirrors": { unfold_mirrors: "bool" },
//     "Open Windows": { open_windows: "bool" },
//     "Close Windows": { close_windows: "bool" },
//     "Enable Sentry Mode": { enable_sentry_mode: "bool" },
//     "Disable Sentry Mode": { disable_sentry_mode: "bool" },
//     "Activate Valet Mode": { activate_valet_mode: "bool" },
//     "Deactivate Valet Mode": { deactivate_valet_mode: "bool" },
//     "Reset Valet PIN": { reset_valet_pin: "bool" },
//     "Summon": {
//       summon: { forward: "bool", reverse: "bool" }
//     },
//     "Smart Summon": {
//       smart_summon: { destination_latitude: "float", destination_longitude: "float" }
//     }
//   },
//   climate: {
//     "Start Climate Control": { start_climate_control: "bool" },
//     "Stop Climate Control": { stop_climate_control: "bool" },
//     "Set Temperature": { temperature: "float" },
//     "Enable Defrost": { enable_defrost: "bool" },
//     "Disable Defrost": { disable_defrost: "bool" },
//     "Set Seat Heater": {
//       seat_heater: { seat: "string", level: "int" }
//     },
//     "Set Steering Wheel Heater": { steering_wheel_heater: "bool" }
//   },
//   battery: {
//     "Start Charging": { start_charging: "bool" },
//     "Stop Charging": { stop_charging: "bool" },
//     "Set Charging Limit": { charging_limit: "int" },
//     "Open Charge Port": { open_charge_port: "bool" },
//     "Close Charge Port": { close_charge_port: "bool" }
//   }
// };

// function CurrentReservation() {
//   const [activeAction, setActiveAction] = useState(null);
//   const [activeSection, setActiveSection] = useState(null);

//   const handleActionClick = (section) => {
//     setActiveSection(activeSection === section ? null : section);
//     setActiveAction(null);
//   };

//   const handleOptionClick = (action) => {
//     setActiveAction(activeAction === action ? null : action);
//   };

//   const renderOptions = (section) => {
//     const sectionData = controls[section];

//     return (
//       <div className="options grid grid-cols-2 gap-3">
//         {Object.keys(sectionData).map((action) => {
//           const options = sectionData[action];

//           return (
//             <div key={action} className="p-3 bg-white rounded shadow">
//               <h3 className="text-sm font-medium">{action}</h3>

//               {/* Render specific control based on type */}
//               <div className="mt-2">
//                 {Object.keys(options).map((optionKey) => {
//                   const optionValue = options[optionKey];

//                   // Boolean -> Render Switch
//                   if (optionValue === "bool") {
//                     return (
//                       <label key={optionKey} className="flex items-center gap-2">
//                         <input
//                           type="checkbox"

//                           className="switch"
//                           onChange={(e) => console.log(`${optionKey}: ${e.target.checked}`)}
//                         />
//                       </label>
//                     );
//                   }

//                   // Float/Int -> Render Slider
//                   if (optionValue === "float" || optionValue === "int") {
//                     return (
//                       <div key={optionKey} className="flex flex-col">

//                         <input
//                           type="range"
//                           id={optionKey}
//                           min={optionValue === "float" ? 0 : 0}
//                           max={optionValue === "float" ? 100 : 100}
//                           step={optionValue === "float" ? 0.1 : 1}
//                           className="slider"
//                           onChange={(e) => console.log(`${optionKey}: ${e.target.value}`)}
//                         />
//                       </div>
//                     );
//                   }

//                   // String with options -> Render Select Dropdown
//                   if (typeof optionValue === "object" && optionValue.type === "string" && optionValue.options) {
//                     return (
//                       <div key={optionKey} className="flex flex-col">
//                         <select
//                           id={optionKey}
//                           className="select border rounded p-2"
//                           onChange={(e) => console.log(`${optionKey}: ${e.target.value}`)}
//                         >
//                           {optionValue.options.map((opt) => (
//                             <option key={opt} value={opt}>
//                               {opt}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     );
//                   }

//                   return null;
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };


//   return (
//     <div className="bg-[#F7F7F7] p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-6">
//       <img
//         className="w-full"
//         src="https://res.cloudinary.com/dxo3z5off/image/upload/f_auto,q_auto/v1/teslarent/sucf1er9ybnmr4yuqzwj"
//         alt="Tesla Model S"
//       />
//       <div className="car-commands">
//         <h1 className="text-3xl font-bold w-full">Tesla Model 3</h1>
//         <div className="w-full flex items-center justify-between mb-8">
//           <span className="flex items-center gap-2">
//             <BatteryCharging /> 180km
//           </span>
//         </div>
//         <div className="fast-actions grid grid-cols-1 md:grid-cols-4 gap-3">
//           <button

//             className={`p-4 bg-white flex items-center gap-3 rounded`}
//           >
//             <Power /> Power on / off
//           </button>
//           <button
//             onClick={() => handleActionClick('car_controls')}
//             className={`p-4 bg-white flex items-center gap-3 rounded ${activeSection === 'car_controls' ? 'bg-gray-100 border ' : ''
//               }`}
//           >
//             <Settings2 /> Control Vehicle
//           </button>
//           <button
//             onClick={() => handleActionClick('climate')}
//             className={`p-4 bg-white flex items-center gap-3 rounded ${activeSection === 'climate' ? 'bg-gray-100 border ' : ''
//               }`}
//           >
//             <Fan /> A/C
//           </button>
//           <button
//             onClick={() => handleActionClick('battery')}
//             className={`p-4 bg-white flex items-center gap-3 rounded ${activeSection === 'battery' ? 'bg-gray-100 border ' : ''
//               }`}
//           >
//             <Battery /> Battery Settings
//           </button>
//         </div>
//         <div className="mt-4">
//           {activeSection && (
//             <div className="">
//               {renderOptions(activeSection)}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CurrentReservation;

import { Battery, BatteryCharging, Fan, Power, Settings2, Lock, Unlock, Volume2, Lightbulb, Car, Eye, Thermometer, Wind, Zap, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Control configuration
const controls = {
  car_controls: {
    "lock_doors": { type: "bool", icon: Lock },
    "unlock_doors": { type: "bool", icon: Unlock },
    "honk_horn": { type: "bool", icon: Volume2 },
    "flash_lights": { type: "bool", icon: Lightbulb },
    "open_trunk": { type: "select", options: ["front", "rear"], icon: Car },
    "start_vehicle": { type: "bool", icon: Power },
    "fold_mirrors": { type: "bool", icon: Car },
    "enable_sentry_mode": { type: "bool", icon: Eye },
  },
  climate: {
    "start_climate": { type: "bool", icon: Wind },
    "temperature": { type: "slider", min: 16, max: 28, unit: "°C", icon: Thermometer },
    "enable_defrost": { type: "bool", icon: Wind },
    "seat_heater": { type: "slider", min: 0, max: 3, unit: "lvl", icon: Thermometer },
    "steering_heater": { type: "bool", icon: Thermometer },
  },
  battery: {
    "start_charging": { type: "bool", icon: Zap },
    "stop_charging": { type: "bool", icon: Battery },
    "charging_limit": { type: "slider", min: 50, max: 100, unit: "%", icon: BatteryCharging },
    "open_charge_port": { type: "bool", icon: Zap },
  }
};

function CurrentReservation() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(null);
  const [controlStates, setControlStates] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  const handleToggle = (key) => {
    setIsLoading(key);
    setTimeout(() => {
      setControlStates(prev => ({ ...prev, [key]: !prev[key] }));
      setIsLoading(null);
    }, 500);
  };

  const handleSlider = (key, value) => {
    setControlStates(prev => ({ ...prev, [key]: value }));
  };

  const handleSelect = (key, value) => {
    setControlStates(prev => ({ ...prev, [key]: value }));
  };

  const renderControl = (key, config) => {
    const Icon = config.icon;
    const isActive = controlStates[key];
    const isCurrentLoading = isLoading === key;

    return (
      <div key={key} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Icon size={18} />
            </div>
            <span className="text-sm font-medium text-gray-900">{t(`carControl.${key}`)}</span>
          </div>
        </div>

        {config.type === "bool" && (
          <button
            onClick={() => handleToggle(key)}
            disabled={isCurrentLoading}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${isActive
                ? 'bg-gray-900 text-white hover:bg-black'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${isCurrentLoading ? 'opacity-50' : ''}`}
          >
            {isCurrentLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              isActive ? t('carControl.on') : t('carControl.off')
            )}
          </button>
        )}

        {config.type === "slider" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{config.min}{config.unit}</span>
              <span className="text-sm font-semibold text-gray-900">{controlStates[key] || config.min}{config.unit}</span>
              <span>{config.max}{config.unit}</span>
            </div>
            <input
              type="range"
              min={config.min}
              max={config.max}
              value={controlStates[key] || config.min}
              onChange={(e) => handleSlider(key, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
          </div>
        )}

        {config.type === "select" && (
          <div className="flex gap-2">
            {config.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(key, opt)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${controlStates[key] === opt
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {t(`carControl.${opt}`)}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sections = [
    { key: 'car_controls', icon: Settings2, label: t('carControl.vehicleControls') },
    { key: 'climate', icon: Fan, label: t('carControl.climate') },
    { key: 'battery', icon: Battery, label: t('carControl.battery') },
  ];

  return (
    <div className="space-y-6">
      {/* Vehicle Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Vehicle Image */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
            <img
              className="w-full max-w-md"
              src="https://res.cloudinary.com/dxo3z5off/image/upload/f_auto,q_auto/v1/teslarent/sucf1er9ybnmr4yuqzwj"
              alt="Tesla Model 3"
            />
          </div>

          {/* Vehicle Info */}
          <div className="p-8">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">{t('carControl.currentVehicle')}</p>
              <h1 className="text-3xl font-semibold text-gray-900">Tesla Model 3</h1>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BatteryCharging size={20} className="text-green-500" />
                  <span className="text-sm text-gray-500">{t('carControl.range')}</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">180 km</p>
                <p className="text-xs text-gray-500">~65% {t('carControl.charged')}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Thermometer size={20} className="text-blue-500" />
                  <span className="text-sm text-gray-500">{t('carControl.interior')}</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">22°C</p>
                <p className="text-xs text-gray-500">{t('carControl.climateOff')}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('carControl.quickActions')}</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-colors">
                  <Power size={18} />
                  {t('carControl.wakeUp')}
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-medium transition-colors">
                  <Lock size={18} />
                  {t('carControl.lockCar')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Sections */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Section Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(activeSection === section.key ? null : section.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors border-b-2 ${activeSection === section.key
                    ? 'border-gray-900 text-gray-900 bg-gray-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        {activeSection && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(controls[activeSection]).map(([key, config]) =>
                renderControl(key, config)
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!activeSection && (
          <div className="p-12 text-center">
            <Settings2 size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">{t('carControl.selectSection')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentReservation;