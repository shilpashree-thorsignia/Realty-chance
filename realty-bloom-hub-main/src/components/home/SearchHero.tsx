import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building, Home as HomeIcon, School, Train, ShoppingBag, Hospital, Coffee, Compass, Construction, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { indianStatesAndCities } from "@/utils/indianHelpers";

const SearchHero: React.FC = () => {
  const [searchType, setSearchType] = useState<"buy" | "rent" | "lease">("buy");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [localities, setLocalities] = useState<string[]>([]);
  const [selectedLocality, setSelectedLocality] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get cities for selected state
  const getCitiesForState = () => {
    if (!selectedState) return [];
    const stateData = indianStatesAndCities.find(s => s.state === selectedState);
    return stateData ? stateData.cities : [];
  };

  // Dummy localities for selected cities (in real app, these would be fetched from backend)
  const getLocalitiesForCity = () => {
    if (!selectedCity) return [];

    // Mock localities for major cities
    const localitiesMap: {
      [key: string]: string[];
    } = {
      "Mumbai": ["Andheri", "Bandra", "Colaba", "Juhu", "Powai", "Worli"],
      "Delhi": ["Connaught Place", "Defence Colony", "Dwarka", "Hauz Khas", "Lajpat Nagar", "Vasant Kunj"],
      "Bangalore": ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Jayanagar", "Electronic City"],
      "Hyderabad": ["Banjara Hills", "Gachibowli", "Hitech City", "Jubilee Hills", "Madhapur", "Kukatpally"],
      "Chennai": ["Adyar", "Anna Nagar", "Mylapore", "T. Nagar", "Velachery", "Besant Nagar"],
      "Kolkata": ["Park Street", "Salt Lake", "New Town", "Ballygunge", "Alipore", "Dumdum"],
      "Pune": ["Koregaon Park", "Kothrud", "Viman Nagar", "Hinjewadi", "Baner", "Aundh"],
      "Ahmedabad": ["Satellite", "Bodakdev", "Vastrapur", "Navrangpura", "Prahladnagar", "CG Road"],
      "Gurgaon": ["DLF Phase 1", "Sohna Road", "Golf Course Road", "Sector 29", "Cyber City", "Palam Vihar"],
      "Noida": ["Sector 18", "Sector 62", "Sector 104", "Sector 128", "Greater Noida West", "Noida Extension"],
      "Lucknow": ["Bhiwandi", "Dhanbad", "Gomti Nagar", "Gurgaon", "Hinjewadi", "Jalgaon"],
      "Kanpur": ["Gomti Nagar", "Gurgaon", "Hinjewadi", "Jalgaon"],
      "Surat": ["Vadodara", "Ahmedabad", "Gandhinagar", "Rajkot", "Baroda"],
      "Jaipur": ["Jodhpur", "Ajmer", "Alwar", "Bikaner", "Udaipur"],
      "mysore": ["Bandra", "Budgam", "Hiranandani", "Kheda", "Krishna Nagar", "Malad"],
        
    };
    return localitiesMap[selectedCity] || [];
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    setIsGettingLocation(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setIsGettingLocation(false);

      // In a real app, we would reverse geocode to get the address
      // For now, we'll just show an alert
      alert(`Location found! Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    }, error => {
      setIsGettingLocation(false);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLocationError("Location permission denied");
          break;
        case error.POSITION_UNAVAILABLE:
          setLocationError("Location information unavailable");
          break;
        case error.TIMEOUT:
          setLocationError("Location request timed out");
          break;
        default:
          setLocationError("An unknown error occurred");
      }
    });
  };

  // Update localities when city changes
  useEffect(() => {
    if (selectedCity) {
      const cityLocalities = getLocalitiesForCity();
      setLocalities(cityLocalities);
      setSelectedLocality("");
    } else {
      setLocalities([]);
      setSelectedLocality("");
    }
  }, [selectedCity]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?type=${searchType}&state=${selectedState}&city=${selectedCity}&locality=${selectedLocality}`);
  };

  // Trending locations in India
  const trendingLocations = ["Gurgaon", "Noida", "Bangalore", "Hyderabad", "Mumbai", "Pune"];

  // Popular amenities tags
  const amenityTags = [{
    icon: <School className="h-3 w-3 mr-1" />,
    name: "Near Schools"
  }, {
    icon: <Train className="h-3 w-3 mr-1" />,
    name: "Metro Station"
  }, {
    icon: <ShoppingBag className="h-3 w-3 mr-1" />,
    name: "Shopping Malls"
  }, {
    icon: <Hospital className="h-3 w-3 mr-1" />,
    name: "Hospitals"
  }, {
    icon: <Coffee className="h-3 w-3 mr-1" />,
    name: "Restaurants"
  }, {
    icon: <MapPin className="h-3 w-3 mr-1" />,
    name: "Parks"
  }, {
    icon: <Building className="h-3 w-3 mr-1" />,
    name: "IT Parks"
  }, {
    icon: <Construction className="h-3 w-3 mr-1" />,
    name: "New Projects"
  }];
  return <div className="relative py-16 md:py-24 lg:py-32">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
            Find Your Dream Property in India
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 animate-fade-in">
            Search through thousands of verified properties across India
          </p>

          <div className="bg-white rounded-lg p-4 shadow-lg animate-fade-in">
            <Tabs defaultValue="buy" onValueChange={value => setSearchType(value as "buy" | "rent" | "lease")} className="mb-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="buy" className="flex items-center">
                  <HomeIcon className="mr-2 h-4 w-4" /> Buy
                </TabsTrigger>
                <TabsTrigger value="rent" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" /> Rent
                </TabsTrigger>
                <TabsTrigger value="lease" className="flex items-center">
                  <Construction className="mr-2 h-4 w-4" /> Lease
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="mt-4">
                <form onSubmit={handleSearch} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedState} onChange={e => {
                      setSelectedState(e.target.value);
                      setSelectedCity("");
                    }} required>
                        <option value="">Select State</option>
                        {indianStatesAndCities.map(state => <option key={state.state} value={state.state}>{state.state}</option>)}
                      </select>
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!selectedState} required>
                        <option value="">Select City</option>
                        {getCitiesForState().map(city => <option key={city} value={city}>{city}</option>)}
                      </select>
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedLocality} onChange={e => setSelectedLocality(e.target.value)} disabled={!selectedCity}>
                        <option value="">Select Locality</option>
                        {localities.map(locality => <option key={locality} value={locality}>{locality}</option>)}
                      </select>
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* Buy-specific filter options */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Budget</option>
                      <option value="1">Under ₹50 Lakh</option>
                      <option value="2">₹50 Lakh - 1 Cr</option>
                      <option value="3">₹1 Cr - 2 Cr</option>
                      <option value="4">₹2 Cr - 5 Cr</option>
                      <option value="5">₹5 Cr+</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House/Villa</option>
                      <option value="plot">Plot/Land</option>
                      <option value="commercial">Commercial</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">BHK</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4+ BHK</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Age of Property</option>
                      <option value="new">Under Construction</option>
                      <option value="ready">Ready to Move</option>
                      <option value="0-5">0-5 Years Old</option>
                      <option value="5+">5+ Years Old</option>
                    </select>
                  </div>

                  {/* Search and location options moved to bottom */}
                  <div className="flex flex-col md:flex-row gap-2 items-center mt-3">
                    <Button type="submit" className="w-full md:flex-1">
                      <Search className="mr-2 h-4 w-4" />
                      Search Properties
                    </Button>
                    <div className="w-full md:w-auto">
                      <Button type="button" variant="outline" className="w-full flex items-center justify-center" onClick={getUserLocation} disabled={isGettingLocation}>
                        {isGettingLocation ? <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full"></div>
                            Getting Location...
                          </> : <>
                            <Compass className="mr-2 h-4 w-4" />
                            Use My Current Location
                          </>}
                      </Button>
                      {locationError && <p className="text-xs text-destructive mt-1 flex items-center">
                          <MapPinOff className="h-3 w-3 mr-1" /> {locationError}
                        </p>}
                    </div>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="rent" className="mt-4">
                <form onSubmit={handleSearch} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedState} onChange={e => {
                      setSelectedState(e.target.value);
                      setSelectedCity("");
                    }} required>
                        <option value="">Select State</option>
                        {indianStatesAndCities.map(state => <option key={state.state} value={state.state}>{state.state}</option>)}
                      </select>
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!selectedState} required>
                        <option value="">Select City</option>
                        {getCitiesForState().map(city => <option key={city} value={city}>{city}</option>)}
                      </select>
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedLocality} onChange={e => setSelectedLocality(e.target.value)} disabled={!selectedCity}>
                        <option value="">Select Locality</option>
                        {localities.map(locality => <option key={locality} value={locality}>{locality}</option>)}
                      </select>
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* Rent-specific filter options */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Monthly Rent</option>
                      <option value="1">Under ₹10,000</option>
                      <option value="2">₹10,000 - ₹25,000</option>
                      <option value="3">₹25,000 - ₹50,000</option>
                      <option value="4">₹50,000+</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House/Villa</option>
                      <option value="room">Single Room</option>
                      <option value="pg">PG/Hostel</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">BHK</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4+ BHK</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Furnishing</option>
                      <option value="fully">Fully Furnished</option>
                      <option value="semi">Semi Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                    </select>
                  </div>

                  {/* Search and location options moved to bottom */}
                  <div className="flex flex-col md:flex-row gap-2 items-center mt-3">
                    <Button type="submit" className="w-full md:flex-1">
                      <Search className="mr-2 h-4 w-4" />
                      Search Properties
                    </Button>
                    <div className="w-full md:w-auto">
                      <Button type="button" variant="outline" className="w-full flex items-center justify-center" onClick={getUserLocation} disabled={isGettingLocation}>
                        {isGettingLocation ? <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full"></div>
                            Getting Location...
                          </> : <>
                            <Compass className="mr-2 h-4 w-4" />
                            Use My Current Location
                          </>}
                      </Button>
                      {locationError && <p className="text-xs text-destructive mt-1 flex items-center">
                          <MapPinOff className="h-3 w-3 mr-1" /> {locationError}
                        </p>}
                    </div>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="lease" className="mt-4">
                <form onSubmit={handleSearch} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedState} onChange={e => {
                      setSelectedState(e.target.value);
                      setSelectedCity("");
                    }} required>
                        <option value="">Select State</option>
                        {indianStatesAndCities.map(state => <option key={state.state} value={state.state}>{state.state}</option>)}
                      </select>
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!selectedState} required>
                        <option value="">Select City</option>
                        {getCitiesForState().map(city => <option key={city} value={city}>{city}</option>)}
                      </select>
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="relative">
                      <select className="w-full pl-9 pr-3 py-2 border rounded-md" value={selectedLocality} onChange={e => setSelectedLocality(e.target.value)} disabled={!selectedCity}>
                        <option value="">Select Locality</option>
                        {localities.map(locality => <option key={locality} value={locality}>{locality}</option>)}
                      </select>
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* Lease-specific filter options */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Lease Period</option>
                      <option value="1-3">1-3 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5-10">5-10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="commercial">Commercial Space</option>
                      <option value="office">Office Space</option>
                      <option value="retail">Retail Shop</option>
                      <option value="warehouse">Warehouse/Godown</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Tenant Preference</option>
                      <option value="individual">Individual</option>
                      <option value="corporate">Corporate</option>
                      <option value="any">Any</option>
                    </select>
                    
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Min Deposit</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                    </select>
                  </div>

                  {/* Search and location options moved to bottom */}
                  <div className="flex flex-col md:flex-row gap-2 items-center mt-3">
                    <Button type="submit" className="w-full md:flex-1">
                      <Search className="mr-2 h-4 w-4" />
                      Search Properties
                    </Button>
                    <div className="w-full md:w-auto">
                      <Button type="button" variant="outline" className="w-full flex items-center justify-center" onClick={getUserLocation} disabled={isGettingLocation}>
                        {isGettingLocation ? <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full"></div>
                            Getting Location...
                          </> : <>
                            <Compass className="mr-2 h-4 w-4" />
                            Use My Current Location
                          </>}
                      </Button>
                      {locationError && <p className="text-xs text-destructive mt-1 flex items-center">
                          <MapPinOff className="h-3 w-3 mr-1" /> {locationError}
                        </p>}
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            {/* Trending Locations */}
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium mb-2">Trending Locations:</p>
              <div className="flex flex-wrap gap-2">
                {trendingLocations.map(location => <Badge variant="outline" key={location} onClick={() => navigate(`/search?city=${location}`)} className="animate-fade-in cursor-pointer hover:bg-primary/10 transition-colors my-0 py-0 mx-px px-[35px]">
                    <MapPin className="h-3 w-3 mr-1 text-secondary" />
                    {location}
                  </Badge>)}
              </div>
            </div>

            {/* Amenity tags */}
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Search by amenities near you:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {amenityTags.map(tag => <Button key={tag.name} variant="outline" size="sm" className="bg-white/80 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-all stagger-item animate-fade-in" onClick={() => navigate(`/search?amenity=${tag.name.toLowerCase().replace(' ', '-')}`)}>
                    {tag.icon}
                    {tag.name}
                  </Button>)}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-white text-sm animate-fade-in">
            <span className="flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-secondary mr-2"></span>
              <span>10,000+ Active Listings</span>
            </span>
            <span className="flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-secondary mr-2"></span>
              <span>200+ Expert Agents</span>
            </span>
            <span className="flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-secondary mr-2"></span>
              <span>Trusted by 50,000+ Users</span>
            </span>
          </div>
        </div>
      </div>
    </div>;
};
export default SearchHero;
