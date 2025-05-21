
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SearchFilters from "@/components/search/SearchFilters";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { saleProperties, rentProperties } from "@/data/mockData";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Compass, MapPin } from "lucide-react";
import { toast } from "sonner";

// Create mocked lease properties by modifying some of the existing properties
const leaseProperties = saleProperties.slice(0, 5).map(prop => ({
  ...prop,
  propertyType: "lease" as const,
  price: Math.round(prop.price * 0.01), // Lower price for lease
  leaseDetails: {
    duration: 36, // 3 years
    securityDeposit: Math.round(prop.price * 0.02),
    lockinPeriod: 12,
    maintenanceIncluded: false,
  }
}));

const PropertyListingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "lease">("buy");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(saleProperties as Property[]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  useEffect(() => {
    // Set properties based on active tab
    switch(activeTab) {
      case "buy":
        setFilteredProperties(saleProperties as Property[]);
        break;
      case "rent":
        setFilteredProperties(rentProperties as Property[]);
        break;
      case "lease":
        setFilteredProperties(leaseProperties as Property[]);
        break;
    }
  }, [activeTab]);

  const handleTabChange = (tab: "buy" | "rent" | "lease") => {
    setActiveTab(tab);
  };
  
  const handleApplyFilters = (filters: any) => {
    // In a real application, this would filter properties based on the selected criteria
    console.log("Applied filters:", filters);
    
    // Simulate filtering (simple example)
    let baseProperties = [] as Property[];
    switch(activeTab) {
      case "buy":
        baseProperties = saleProperties as Property[];
        break;
      case "rent":
        baseProperties = rentProperties as Property[];
        break;
      case "lease":
        baseProperties = leaseProperties as Property[];
        break;
    }
    
    // Apply basic filters
    let filtered = [...baseProperties];
    
    // Filter by property type if not "any"
    if (filters.propertyType !== "any") {
      filtered = filtered.filter(property => {
        if (filters.propertyType === "house") return property.title.toLowerCase().includes("house") || property.title.toLowerCase().includes("home");
        if (filters.propertyType === "apartment") return property.title.toLowerCase().includes("apartment") || property.title.toLowerCase().includes("studio");
        if (filters.propertyType === "villa") return property.title.toLowerCase().includes("villa");
        if (filters.propertyType === "plot") return property.title.toLowerCase().includes("plot") || property.title.toLowerCase().includes("land");
        return true;
      });
    }
    
    // Filter by price range
    filtered = filtered.filter(property => 
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );
    
    // Filter by amenities if any selected
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(property => {
        if (!property.amenities) return false;
        return filters.amenities.some((amenity: string) => 
          property.amenities?.some(propAmenity => 
            propAmenity.name.toLowerCase().includes(amenity.toLowerCase())
          )
        );
      });
    }
    
    setFilteredProperties(filtered);
  };

  // Get user's current location and find nearby properties
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGettingLocation(false);
        
        // In a real app, we would use the coordinates to find nearby properties
        const { latitude, longitude } = position.coords;
        console.log(`Found location: ${latitude}, ${longitude}`);
        
        // Simulate finding nearby properties
        // In a real app, we would make an API call to find properties near these coordinates
        toast.success("Location found! Showing properties near you");
        
        // For demo purposes, let's filter to show fewer properties as if they were nearby
        const nearbyProperties = activeTab === "buy" 
          ? (saleProperties.slice(0, 3) as Property[])
          : activeTab === "rent" 
            ? (rentProperties.slice(0, 3) as Property[])
            : (leaseProperties.slice(0, 3) as Property[]);
            
        setFilteredProperties(nearbyProperties);
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
        
        toast.error(`Error: ${errorMsg}`);
      }
    );
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Browse Properties</h1>
        
        {/* Buy/Rent/Lease Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === "buy"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => handleTabChange("buy")}
          >
            For Sale
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === "rent"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => handleTabChange("rent")}
          >
            For Rent
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === "lease"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => handleTabChange("lease")}
          >
            For Lease
          </button>
        </div>
        
        {/* Find Properties Near Me */}
        <div className="mb-6">
          <Button 
            onClick={getUserLocation} 
            disabled={isGettingLocation}
            className="flex items-center"
            variant="outline"
          >
            {isGettingLocation ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full"></div>
                Finding properties near you...
              </>
            ) : (
              <>
                <Compass className="mr-2 h-4 w-4" />
                Find Properties Near Me
              </>
            )}
          </Button>
        </div>
        
        {/* Search Filters */}
        <SearchFilters onApplyFilters={handleApplyFilters} />
        
        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredProperties.length} properties found
          </p>
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price (Low to High)</option>
              <option value="price_high">Price (High to Low)</option>
            </select>
          </div>
        </div>
        
        {/* Property Grid with Amenity Filter */}
        {filteredProperties.length > 0 ? (
          <PropertyGrid 
            properties={filteredProperties} 
            showAmenityFilter={true}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria to find more properties
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PropertyListingPage;
