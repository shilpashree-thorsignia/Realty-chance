
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Upload, X, Check } from "lucide-react";
// Either use these imports or remove them if not needed
// import { useForm } from "react-hook-form";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const PropertyForm: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [propertyStatus, setPropertyStatus] = useState<"sale" | "rent" | "lease">("sale");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const newImages = [...images, ...selectedFiles].slice(0, 10); // Limit to 10 images
      setImages(newImages);

      // Create previews
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]); // Clean up memory
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Property Title *
              </label>
              <input
                id="title"
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="e.g. Modern Apartment with Amazing View"
                required
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Listing Type *
              </label>
              <select
                id="status"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                value={propertyStatus}
                onChange={(e) => setPropertyStatus(e.target.value as "sale" | "rent" | "lease")}
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="lease">For Lease</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                {propertyStatus === "sale" ? "Price *" : 
                 propertyStatus === "rent" ? "Monthly Rent *" : 
                 "Security Amount *"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <input
                  id="price"
                  type="number"
                  min="0"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder={propertyStatus === "sale" ? "e.g. 2500000" : "e.g. 15000"}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium mb-1">
                Property Type *
              </label>
              <select
                id="propertyType"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="">Select property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land/Plot</option>
                <option value="office">Office Space</option>
                <option value="shop">Shop/Retail</option>
                <option value="warehouse">Warehouse/Godown</option>
              </select>
            </div>
          </div>
          
          {propertyStatus === "lease" && (
            <div className="mt-4 border p-4 rounded-md bg-muted/30">
              <h4 className="font-medium mb-3">Lease Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="leaseDuration" className="block text-sm font-medium mb-1">
                    Lease Duration (months) *
                  </label>
                  <input
                    id="leaseDuration"
                    type="number"
                    min="1"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="e.g. 36"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lockInPeriod" className="block text-sm font-medium mb-1">
                    Lock-in Period (months)
                  </label>
                  <input
                    id="lockInPeriod"
                    type="number"
                    min="0"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="e.g. 12"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2 h-4 w-4" />
                    Maintenance Included in Rent
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium mb-1">
                Bedrooms
              </label>
              <input
                id="bedrooms"
                type="number"
                min="0"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="e.g. 3"
              />
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium mb-1">
                Bathrooms
              </label>
              <input
                id="bathrooms"
                type="number"
                min="0"
                step="0.5"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="e.g. 2"
              />
            </div>
            <div>
              <label htmlFor="area" className="block text-sm font-medium mb-1">
                Area (sq ft)
              </label>
              <input
                id="area"
                type="number"
                min="0"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="e.g. 1200"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
              {["Air Conditioning", "Balcony", "Garage", "Gym", "Swimming Pool", "Furnished", "Pet Friendly", "Security", "Garden", "Elevator", "Parking", "Internet"].map((amenity) => (
                <label key={amenity} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    name="amenities"
                    value={amenity.toLowerCase().replace(" ", "_")}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Location</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="address"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="e.g. 123 Main St"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="e.g. New York"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-1">
                  State *
                </label>
                <input
                  id="state"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="e.g. NY"
                  required
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                  Zip Code *
                </label>
                <input
                  id="zipCode"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="e.g. 10001"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Nearby Amenities</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Properties with nearby amenities get 2x more inquiries
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Schools & Colleges</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Name (e.g. Delhi Public School)"
              />
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Distance (e.g. 1 km)"
                />
                <Button type="button" variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Metro Stations</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Name (e.g. Rajiv Chowk)"
              />
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Distance (e.g. 500 m)"
                />
                <Button type="button" variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Hospitals</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Name (e.g. Apollo Hospital)"
              />
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Distance (e.g. 2 km)"
                />
                <Button type="button" variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Shopping Malls</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Name (e.g. Select City Walk)"
              />
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Distance (e.g. 1.5 km)"
                />
                <Button type="button" variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Description & Media</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Property Description *
              </label>
              <textarea
                id="description"
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Describe the property in detail..."
                required
              ></textarea>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium">
                  Property Images *
                </label>
                <span className="text-xs text-muted-foreground">
                  {images.length}/10 (Max 10 images)
                </span>
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-32">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white hover:bg-black/70 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag & drop images here, or click to select files
                </p>
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={images.length >= 10}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("images")?.click()}
                  disabled={images.length >= 10}
                >
                  Select Files
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">
            Publish Property
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
