// Location service utilities for handling geolocation and address conversion

/**
 * Reverse geocoding using OpenStreetMap Nominatim API
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<string>} Human-readable address
 */
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Alumni-Privacy-App/1.0' // Required by Nominatim
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }
    
    const data = await response.json();
    return data.display_name || `${latitude}, ${longitude}`;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return `${latitude}, ${longitude}`;
  }
};

/**
 * Forward geocoding using OpenStreetMap Nominatim API
 * @param {string} address - Address string to convert to coordinates
 * @returns {Promise<Object>} Location object with coordinates and formatted address
 */
export const forwardGeocode = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Alumni-Privacy-App/1.0' // Required by Nominatim
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to search address');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error('Address not found');
    }
    
    const result = data[0];
    return {
      type: "Point",
      coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
      address: result.display_name
    };
  } catch (error) {
    console.error('Forward geocoding error:', error);
    throw error;
  }
};

/**
 * Get current user location with reverse geocoding
 * @param {Object} options - Geolocation options
 * @returns {Promise<Object>} Location object with coordinates and address
 */
export const getCurrentLocationWithAddress = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    const defaultOptions = {
      enableHighAccuracy: false, // Use network-based location for faster response
      timeout: 8000, // Reduce timeout to 8 seconds
      maximumAge: 600000, // Cache for 10 minutes
      ...options
    };

    // Create a timeout promise that rejects after a shorter time
    const timeoutPromise = new Promise((_, timeoutReject) => {
      setTimeout(() => {
        timeoutReject(new Error("Location request timed out. Please try entering your address manually."));
      }, defaultOptions.timeout);
    });

    // Create the geolocation promise
    const geolocationPromise = new Promise((geoResolve, geoReject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Get address from coordinates with timeout
            const address = await Promise.race([
              reverseGeocode(latitude, longitude),
              new Promise((_, timeoutReject) => {
                setTimeout(() => timeoutReject(new Error("Address lookup timed out")), 5000);
              })
            ]);
            
            // Create location object in the required format
            const locationObj = {
              type: "Point",
              coordinates: [longitude, latitude], // GeoJSON format: [lng, lat]
              address: address
            };

            geoResolve(locationObj);
          } catch (error) {
            console.error("Reverse geocoding failed:", error);
            // Still resolve with coordinates even if address lookup fails
            const { latitude, longitude } = position.coords;
            const locationObj = {
              type: "Point",
              coordinates: [longitude, latitude],
              address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
            };
            geoResolve(locationObj);
          }
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please enter your address manually.";
              break;
            case error.POSITION_UNAVAILABLE:
              // This is the kCLErrorLocationUnknown error from CoreLocation
              errorMessage = "Location services unavailable on this device. Please enter your address manually.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please enter your address manually.";
              break;
            default:
              errorMessage = "Unable to get your location. Please enter your address manually.";
              break;
          }
          
          geoReject(new Error(errorMessage));
        },
        defaultOptions
      );
    });

    // Race between geolocation and timeout
    Promise.race([geolocationPromise, timeoutPromise])
      .then(resolve)
      .catch(reject);
  });
};

/**
 * Format location object for API submission
 * @param {Object} location - Location object
 * @returns {Object} Formatted location object
 */
export const formatLocationForAPI = (location) => {
  if (!location || !location.coordinates) {
    return null;
  }

  return {
    type: location.type || "Point",
    coordinates: location.coordinates,
    address: location.address || ""
  };
};

/**
 * Validate location object
 * @param {Object} location - Location object to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateLocation = (location) => {
  if (!location || typeof location !== 'object') {
    return false;
  }

  const { type, coordinates, address } = location;

  // Check if type is valid
  if (type !== "Point") {
    return false;
  }

  // Check if coordinates are valid
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return false;
  }

  const [longitude, latitude] = coordinates;
  
  // Check if coordinates are valid numbers
  if (typeof longitude !== 'number' || typeof latitude !== 'number') {
    return false;
  }

  // Check if coordinates are within valid ranges
  if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
    return false;
  }

  // Check if address is a string
  if (typeof address !== 'string') {
    return false;
  }

  return true;
};