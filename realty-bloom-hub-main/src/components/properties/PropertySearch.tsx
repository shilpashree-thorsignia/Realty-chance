
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building, Compass, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { indianStatesAndCities } from "@/utils/indianHelpers";
import { toast } from "sonner";
import propertyApi from "@/services/api";

interface PropertySearchProps {
  simplified?: boolean;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ simplified = false }) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [propertyType, setPropertyType] = useState<"sale" | "rent" | "lease">("sale");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Get cities for selected state
  const getCitiesForState = () => {
    if (!selectedState) return [];
    const stateData = indianStatesAndCities.find(s => s.state === selectedState);
    return stateData ? stateData.cities : [];
  };

  // Handle search submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create filter parameters
      const filters = {
        property_type: propertyType,
        state: selectedState,
        city: selectedCity,
      };
      
      // Navigate to search page with query parameters
      navigate(`/search?type=${propertyType}&state=${selectedState}&city=${selectedCity}`);
      
      // You can also fetch data directly here if needed
      // const response = await propertyApi.getProperties(filters);
      // console.log('Properties:', response.data);
    } catch (error) {
      console.error('Error searching properties:', error);
      toast.error('Failed to search properties. Please try again.');
    }
  };

  // Get user's current location and find nearby properties
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    setIsGettingLocation(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsGettingLocation(false);
        
        try {
          // In a real app, we would reverse geocode to get the address
          toast.success("Location found! Finding properties near you...");
          
          // You can make an API call to find properties near these coordinates
          // const response = await propertyApi.getProperties({
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // });
          
          // Navigate to search page with coordinates
          navigate(`/search?nearme=true&lat=${position.coords.latitude}&lng=${position.coords.longitude}`);
        } catch (error) {
          console.error('Error finding nearby properties:', error);
          toast.error('Failed to find nearby properties. Please try again.');
        }
      },
      (error) => {
        setIsGettingLocation(false);
        let errorMsg = "An unknown error occurred";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMsg = "Location request timed out";
            break;
        }
        
        setLocationError(errorMsg);
        toast.error(`Error: ${errorMsg}`);
      }
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-md ${simplified ? 'p-4' : 'p-6'}`}>
      <div className={`flex items-center justify-between mb-4 ${simplified ? 'hidden' : ''}`}>
        <div className="flex items-center">
          <Filter className="mr-2 h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Search Properties</h3>
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <select 
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as "sale" | "rent" | "lease")}
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="lease">For Lease</option>
            </select>
            <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          
          <div className="relative">
            <select 
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
              }}
            >
              <option value="">Select State</option>
              {indianStatesAndCities.map(state => (
                <option key={state.state} value={state.state}>{state.state}</option>
              ))}
            </select>
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          
          <div className="relative">
            <select 
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {getCitiesForState().map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <Button type="submit" className="w-full md:flex-1">
            <Search className="mr-2 h-4 w-4" />
            Search Properties
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full md:w-auto" 
            onClick={getUserLocation}
            disabled={isGettingLocation}
          >
            {isGettingLocation ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full"></div>
                Getting Location...
              </>
            ) : (
              <>
                <Compass className="mr-2 h-4 w-4" />
                Find Properties Near Me
              </>
            )}
          </Button>
        </div>
        
        {locationError && (
          <p className="text-xs text-destructive mt-1">Error: {locationError}</p>
        )}
      </form>
    </div>
  );
};

export default PropertySearch;
