import { Battery, BatteryCharging, Fan, Power, Settings2 } from 'lucide-react';
import React, { useState } from 'react';

// JSON structure
const controls = {
  car_controls: {
    "Lock Doors": { lock_doors: "bool" },
    "Unlock Doors": { unlock_doors: "bool" },
    "Honk Horn": { honk_horn: "bool" },
    "Flash Lights": { flash_lights: "bool" },
    "Open Trunk": {
      open_trunk: { type: "string", options: ["front", "rear"] }
    },
    "Close Trunk": {
      close_trunk: { type: "string", options: ["front", "rear"] }
    },
    "Start Vehicle": { start_vehicle: "bool" },
    "Fold Mirrors": { fold_mirrors: "bool" },
    "Unfold Mirrors": { unfold_mirrors: "bool" },
    "Open Windows": { open_windows: "bool" },
    "Close Windows": { close_windows: "bool" },
    "Enable Sentry Mode": { enable_sentry_mode: "bool" },
    "Disable Sentry Mode": { disable_sentry_mode: "bool" },
    "Activate Valet Mode": { activate_valet_mode: "bool" },
    "Deactivate Valet Mode": { deactivate_valet_mode: "bool" },
    "Reset Valet PIN": { reset_valet_pin: "bool" },
    "Summon": {
      summon: { forward: "bool", reverse: "bool" }
    },
    "Smart Summon": {
      smart_summon: { destination_latitude: "float", destination_longitude: "float" }
    }
  },
  climate: {
    "Start Climate Control": { start_climate_control: "bool" },
    "Stop Climate Control": { stop_climate_control: "bool" },
    "Set Temperature": { temperature: "float" },
    "Enable Defrost": { enable_defrost: "bool" },
    "Disable Defrost": { disable_defrost: "bool" },
    "Set Seat Heater": {
      seat_heater: { seat: "string", level: "int" }
    },
    "Set Steering Wheel Heater": { steering_wheel_heater: "bool" }
  },
  battery: {
    "Start Charging": { start_charging: "bool" },
    "Stop Charging": { stop_charging: "bool" },
    "Set Charging Limit": { charging_limit: "int" },
    "Open Charge Port": { open_charge_port: "bool" },
    "Close Charge Port": { close_charge_port: "bool" }
  }
};

function CurrentReservation() {
  const [activeAction, setActiveAction] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const handleActionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
    setActiveAction(null);
  };

  const handleOptionClick = (action) => {
    setActiveAction(activeAction === action ? null : action);
  };

  const renderOptions = (section) => {
    const sectionData = controls[section];

    return (
      <div className="options grid grid-cols-2 gap-3">
        {Object.keys(sectionData).map((action) => {
          const options = sectionData[action];

          return (
            <div key={action} className="p-3 bg-white rounded shadow">
              <h3 className="text-sm font-medium">{action}</h3>

              {/* Render specific control based on type */}
              <div className="mt-2">
                {Object.keys(options).map((optionKey) => {
                  const optionValue = options[optionKey];

                  // Boolean -> Render Switch
                  if (optionValue === "bool") {
                    return (
                      <label key={optionKey} className="flex items-center gap-2">
                        <input
                          type="checkbox"

                          className="switch"
                          onChange={(e) => console.log(`${optionKey}: ${e.target.checked}`)}
                        />
                      </label>
                    );
                  }

                  // Float/Int -> Render Slider
                  if (optionValue === "float" || optionValue === "int") {
                    return (
                      <div key={optionKey} className="flex flex-col">

                        <input
                          type="range"
                          id={optionKey}
                          min={optionValue === "float" ? 0 : 0}
                          max={optionValue === "float" ? 100 : 100}
                          step={optionValue === "float" ? 0.1 : 1}
                          className="slider"
                          onChange={(e) => console.log(`${optionKey}: ${e.target.value}`)}
                        />
                      </div>
                    );
                  }

                  // String with options -> Render Select Dropdown
                  if (typeof optionValue === "object" && optionValue.type === "string" && optionValue.options) {
                    return (
                      <div key={optionKey} className="flex flex-col">
                        <select
                          id={optionKey}
                          className="select border rounded p-2"
                          onChange={(e) => console.log(`${optionKey}: ${e.target.value}`)}
                        >
                          {optionValue.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };


  return (
    <div className="bg-[#F7F7F7] p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        className="w-full"
        src="https://res.cloudinary.com/dxo3z5off/image/upload/f_auto,q_auto/v1/teslarent/sucf1er9ybnmr4yuqzwj"
        alt="Tesla Model S"
      />
      <div className="car-commands">
        <h1 className="text-3xl font-bold w-full">Tesla Model 3</h1>
        <div className="w-full flex items-center justify-between mb-8">
          <span className="flex items-center gap-2">
            <BatteryCharging /> 180km
          </span>
        </div>
        <div className="fast-actions grid grid-cols-1 md:grid-cols-4 gap-3">
          <button

            className={`p-4 bg-white flex items-center gap-3 rounded`}
          >
            <Power /> Power on / off
          </button>
          <button
            onClick={() => handleActionClick('car_controls')}
            className={`p-4 bg-white flex items-center gap-3 rounded ${activeSection === 'car_controls' ? 'bg-gray-100 border ' : ''
              }`}
          >
            <Settings2 /> Control Vehicle
          </button>
          <button
            onClick={() => handleActionClick('climate')}
            className={`p-4 bg-white flex items-center gap-3 rounded ${activeSection === 'climate' ? 'bg-gray-100 border ' : ''
              }`}
          >
            <Fan /> A/C
          </button>
          <button
            onClick={() => handleActionClick('battery')}
            className={`p-4 bg-white flex items-center gap-3 rounded ${activeSection === 'battery' ? 'bg-gray-100 border ' : ''
              }`}
          >
            <Battery /> Battery Settings
          </button>
        </div>
        <div className="mt-4">
          {activeSection && (
            <div className="">
              {renderOptions(activeSection)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentReservation;
