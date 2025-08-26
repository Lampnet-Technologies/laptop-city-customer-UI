import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';

const ProductFilter = ({ 
  fetchUrl, 
  title, 
  checked, 
  setter, 
  onChange,
  placeholder = "Select an option"
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(LoginContext) || {};

  useEffect(() => {
    const fetchFilterOptions = async () => {
      if (!fetchUrl) {
        console.warn(`No fetchUrl provided for ${title} filter`);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching ${title} options from: ${fetchUrl}`);

        // Prepare headers
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };

        // Add authentication if token is available
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers,
          signal: AbortSignal.timeout(15000), // 15 second timeout
        });

        console.log(`${title} API response status: ${response.status}`);

        if (!response.ok) {
          let errorMessage = `Failed to fetch ${title}: ${response.status} ${response.statusText}`;
          
          try {
            const errorData = await response.json();
            errorMessage = errorData?.message || errorData?.error || errorMessage;
          } catch (parseError) {
            console.warn(`Could not parse ${title} error response`);
          }
          
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(`${title} data:`, data);

        // Handle different response formats
        let processedOptions = [];

        if (Array.isArray(data)) {
          // Direct array response
          processedOptions = data;
        } else if (data.content && Array.isArray(data.content)) {
          // Paginated response
          processedOptions = data.content;
        } else if (data.data && Array.isArray(data.data)) {
          // Alternative structure
          processedOptions = data.data;
        } else if (data[title] && Array.isArray(data[title])) {
          // Response with key matching the title
          processedOptions = data[title];
        } else {
          console.warn(`Unexpected ${title} response format:`, data);
          processedOptions = [];
        }

        // Validate and format options
        const validOptions = processedOptions
          .filter(option => option && (option.id || option.name))
          .map(option => ({
            id: option.id || option.name || option,
            name: option.name || option.title || option.label || option,
            // Additional fields that might be useful
            status: option.status,
            category: option.category,
            ...option
          }));

        setOptions(validOptions);

      } catch (error) {
        console.error(`Failed to fetch ${title} options:`, error);
        setError(error.message);
        setOptions([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, [fetchUrl, title, token]);

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    setter(selectedValue);
    
    // Trigger onChange callback if provided
    if (onChange) {
      onChange();
    }
  };

  const handleClear = () => {
    setter('');
    if (onChange) {
      onChange();
    }
  };

  if (loading) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
          {title}
        </label>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-green border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-500">Loading {title}...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
          {title}
        </label>
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          Failed to load {title} options
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
        {title} {options.length > 0 && `(${options.length})`}
      </label>
      
      <div className="relative">
        <select
          value={checked || ''}
          onChange={handleSelectionChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green focus:border-transparent appearance-none bg-white text-sm"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
              {option.status && ` (${option.status})`}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Clear button */}
      {checked && (
        <button
          onClick={handleClear}
          className="mt-2 text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Clear {title} filter
        </button>
      )}

      {/* Show selected option details */}
      {checked && options.length > 0 && (
        <div className="mt-2 text-xs text-gray-600">
          Selected: {options.find(opt => opt.id === checked)?.name || checked}
        </div>
      )}
    </div>
  );
};

// Alternative checkbox-style filter for multiple selections
export const CheckboxFilter = ({ 
  fetchUrl, 
  title, 
  checked = [], 
  setter, 
  onChange,
  maxItems = 10 
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { token } = useContext(LoginContext) || {};

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(fetchUrl, { 
          method: 'GET',
          headers,
          signal: AbortSignal.timeout(15000)
        });

        if (!response.ok) throw new Error(`Failed to fetch ${title}`);

        const data = await response.json();
        const processedOptions = Array.isArray(data) ? data : 
                               data.content || data.data || [];

        setOptions(processedOptions.map(option => ({
          id: option.id || option.name || option,
          name: option.name || option.title || option,
          count: option.productCount || option.count
        })));

      } catch (error) {
        setError(error.message);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    if (fetchUrl) fetchFilterOptions();
  }, [fetchUrl, title, token]);

  const handleCheckboxChange = (optionId, isChecked) => {
    let newSelection = [...(checked || [])];
    
    if (isChecked) {
      if (!newSelection.includes(optionId)) {
        newSelection.push(optionId);
      }
    } else {
      newSelection = newSelection.filter(id => id !== optionId);
    }
    
    setter(newSelection);
    if (onChange) onChange();
  };

  const displayOptions = showAll ? options : options.slice(0, maxItems);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-20 rounded"></div>;
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
        {title} {checked?.length > 0 && `(${checked.length} selected)`}
      </label>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {displayOptions.map((option) => (
          <label key={option.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input
              type="checkbox"
              checked={checked?.includes(option.id) || false}
              onChange={(e) => handleCheckboxChange(option.id, e.target.checked)}
              className="rounded border-gray-300 text-green focus:ring-green"
            />
            <span className="text-sm">{option.name}</span>
            {option.count && (
              <span className="text-xs text-gray-500">({option.count})</span>
            )}
          </label>
        ))}
      </div>

      {options.length > maxItems && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm text-green hover:text-dark-green"
        >
          {showAll ? 'Show Less' : `Show All (${options.length})`}
        </button>
      )}

      {checked?.length > 0 && (
        <button
          onClick={() => setter([])}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default ProductFilter;