import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { propertyApi } from "@/services/api";
import { toast } from "sonner";

const AdminPropertyManagementPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await propertyApi.getAll();
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [isAuthenticated, user, navigate]);

  const handleVerifyProperty = async (id: string) => {
    try {
      await propertyApi.verifyProperty(id);
      setProperties(prev => 
        prev.map(property => 
          property.id === id ? { ...property, isVerified: true } : property
        )
      );
      toast.success('Property verified successfully');
    } catch (error) {
      console.error('Error verifying property:', error);
      toast.error('Failed to verify property');
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }
    
    try {
      await propertyApi.deleteProperty(id);
      setProperties(prev => prev.filter(property => property.id !== id));
      toast.success('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const handleRestoreProperty = async (id: string) => {
    try {
      await propertyApi.restoreProperty(id);
      setProperties(prev => 
        prev.map(property => 
          property.id === id ? { ...property, isDeleted: false } : property
        )
      );
      toast.success('Property restored successfully');
    } catch (error) {
      console.error('Error restoring property:', error);
      toast.error('Failed to restore property');
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Property Management</h1>
        <p className="text-muted-foreground mb-6">Manage all properties in the system</p>

        <Tabs defaultValue="unverified" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="unverified">Unverified Properties</TabsTrigger>
            <TabsTrigger value="verified">Verified Properties</TabsTrigger>
            <TabsTrigger value="deleted">Deleted Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="unverified">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">Loading properties...</div>
              ) : (
                properties
                  .filter(property => !property.isVerified && !property.isDeleted)
                  .map(property => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <p className="text-sm">Owner: {property.owner.name}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleVerifyProperty(property.id)}>
                            Verify
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteProperty(property.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
              {!loading && properties.filter(p => !p.isVerified && !p.isDeleted).length === 0 && (
                <div className="text-center py-12">No unverified properties found</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="verified">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">Loading properties...</div>
              ) : (
                properties
                  .filter(property => property.isVerified && !property.isDeleted)
                  .map(property => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <p className="text-sm">Owner: {property.owner.name}</p>
                        </div>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProperty(property.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
              )}
              {!loading && properties.filter(p => p.isVerified && !p.isDeleted).length === 0 && (
                <div className="text-center py-12">No verified properties found</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="deleted">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">Loading properties...</div>
              ) : (
                properties
                  .filter(property => property.isDeleted)
                  .map(property => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <p className="text-sm">Owner: {property.owner.name}</p>
                        </div>
                        <Button size="sm" onClick={() => handleRestoreProperty(property.id)}>
                          Restore
                        </Button>
                      </div>
                    </div>
                  ))
              )}
              {!loading && properties.filter(p => p.isDeleted).length === 0 && (
                <div className="text-center py-12">No deleted properties found</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPropertyManagementPage;