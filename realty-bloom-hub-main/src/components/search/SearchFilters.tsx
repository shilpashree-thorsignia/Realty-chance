
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Home, IndianRupee } from "lucide-react";
import { indianPropertyTypes, indianPropertyAmenities, indianStatesAndCities } from "@/utils/indianHelpers";

interface SearchFiltersProps {
  onApplyFilters: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onApplyFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  
  const [filters, setFilters] = useState({
    propertyType: "any",
    priceRange: [0, 10000000], // Higher range for Indian property prices
    bedrooms: "any",
    bathrooms: "any",
    amenities: [] as string[],
    state: "",
    city: ""
  });

  // Get cities for selected state
  const getCitiesForState = () => {
    if (!selectedState) return [];
    const stateData = indianStatesAndCities.find(s => s.state === selectedState);
    return stateData ? stateData.cities : [];
  };

  const handlePropertyTypeChange = (type: string) => {
    setFilters({ ...filters, propertyType: type });
  };

  const handleBedroomChange = (value: string) => {
    setFilters({ ...filters, bedrooms: value });
  };

  const handleBathroomChange = (value: string) => {
    setFilters({ ...filters, bathrooms: value });
  };

  const handlePriceChange = (values: number[]) => {
    setFilters({ ...filters, priceRange: values });
  };

  const handleAmenityChange = (amenity: string) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: updatedAmenities });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setFilters({ 
      ...filters, 
      state: newState,
      city: "" // Reset city when state changes
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, city: e.target.value });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const formatPrice = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="mr-2 h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm"
        >
          {isExpanded ? "Hide Filters" : "Show More Filters"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Location Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select 
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {indianStatesAndCities.map(state => (
              <option key={state.state} value={state.state}>{state.state}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <select 
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.city}
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {getCitiesForState().map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Type</label>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filters.propertyType === "any" ? "default" : "outline"} 
              size="sm"
              onClick={() => handlePropertyTypeChange("any")}
            >
              Any
            </Button>
            <Button 
              variant={filters.propertyType === "flat" ? "default" : "outline"} 
              size="sm"
              onClick={() => handlePropertyTypeChange("flat")}
            >
              Flat/Apartment
            </Button>
            <Button 
              variant={filters.propertyType === "house" ? "default" : "outline"} 
              size="sm"
              onClick={() => handlePropertyTypeChange("house")}
            >
              House/Villa
            </Button>
            <Button 
              variant={filters.propertyType === "plot" ? "default" : "outline"} 
              size="sm"
              onClick={() => handlePropertyTypeChange("plot")}
            >
              Plot/Land
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filters.bedrooms === "any" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBedroomChange("any")}
            >
              Any
            </Button>
            <Button 
              variant={filters.bedrooms === "1" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBedroomChange("1")}
            >
              1
            </Button>
            <Button 
              variant={filters.bedrooms === "2" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBedroomChange("2")}
            >
              2
            </Button>
            <Button 
              variant={filters.bedrooms === "3" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBedroomChange("3")}
            >
              3
            </Button>
            <Button 
              variant={filters.bedrooms === "4+" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBedroomChange("4+")}
            >
              4+
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms</label>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filters.bathrooms === "any" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBathroomChange("any")}
            >
              Any
            </Button>
            <Button 
              variant={filters.bathrooms === "1" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBathroomChange("1")}
            >
              1
            </Button>
            <Button 
              variant={filters.bathrooms === "2" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBathroomChange("2")}
            >
              2
            </Button>
            <Button 
              variant={filters.bathrooms === "3+" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleBathroomChange("3+")}
            >
              3+
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 flex items-center">
          <IndianRupee className="h-4 w-4 mr-1" />
          Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
        </label>
        <Slider
          defaultValue={[0, 10000000]}
          min={0}
          max={50000000}
          step={100000}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="my-4"
        />
      </div>

      {isExpanded && (
        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-medium mb-3">Amenities</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {indianPropertyAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4 pt-4 border-t">
        <Button onClick={handleApplyFilters}>
          <Search className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
