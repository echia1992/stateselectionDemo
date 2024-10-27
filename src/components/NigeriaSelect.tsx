import React from "react";
import { useNigeriaLocations } from "../hooks/useNigeriaLocations";
import type { NigeriaSelectProps } from "../types";

const NigeriaSelect: React.FC<NigeriaSelectProps> = ({
  onChange,
  onStateChange,
  onLGAChange,
  defaultState,
  defaultLGA,
  className = "",
  selectClassName = "",
  labelClassName = "",
  showLabels = true,
  labels = {
    state: "State",
    lga: "Local Government Area",
  },
  required = false,
  disabled = false,
  loading = false,
  placeholder = {
    state: "Select a state",
    lga: "Select a LGA",
  },
}) => {
  const {
    states,
    lgas,
    selectedState,
    selectedLGA,
    setSelectedState,
    setSelectedLGA,
  } = useNigeriaLocations(defaultState);

  React.useEffect(() => {
    if (defaultState && defaultLGA) {
      setSelectedState(defaultState);
      setSelectedLGA(defaultLGA);
    }
  }, [defaultState, defaultLGA]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedState(state);
    onStateChange?.(state);
    onChange?.({ state, lga: "" });
  };

  const handleLGAChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lga = event.target.value;
    setSelectedLGA(lga);
    onLGAChange?.(lga);
    onChange?.({ state: selectedState, lga });
  };

  const baseSelectClass = `block w-full p-5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
    disabled ? "bg-gray-100" : ""
  } ${selectClassName}`;

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        {showLabels && (
          <label
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {labels.state}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={disabled || loading}
          required={required}
          className={baseSelectClass}
        >
          <option value="">
            {loading ? "Loading states..." : placeholder.state}
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div>
        {showLabels && (
          <label
            className={`block text-sm w-full font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {labels.lga}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          value={selectedLGA}
          onChange={handleLGAChange}
          disabled={!selectedState || disabled || loading}
          required={required}
          className={baseSelectClass}
        >
          <option value="">
            {loading ? "Loading LGAs..." : placeholder.lga}
          </option>
          {lgas.map((lga) => (
            <option className="w-full" key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NigeriaSelect;
