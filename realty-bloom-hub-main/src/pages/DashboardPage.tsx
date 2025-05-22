import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { propertyApi, inquiryApi } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data based on user role
        if (user?.role === 'admin') {
          // Admin sees all properties including unverified ones
          const [propertiesRes, inquiriesRes] = await Promise.all([
            propertyApi.getAll(),
            inquiryApi.getAll()
          ]);
          setProperties(propertiesRes.data);
          setInquiries(inquiriesRes.data);
        } else if (user?.role === 'property_owner') {
          // Property owners see their own properties
          const [propertiesRes, inquiriesRes] = await Promise.all([
            propertyApi.getByOwner(user.id),
            inquiryApi.getByOwner(user.id)
          ]);
          setProperties(propertiesRes.data);
          setInquiries(inquiriesRes.data);
        } else {
          // Regular users see their inquiries
          const inquiriesRes = await inquiryApi.getByUser(user?.id);
          setInquiries(inquiriesRes.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const handleInquiryAction = async (inquiryId: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        await inquiryApi.approveInquiry(inquiryId);
      } else {
        await inquiryApi.rejectInquiry(inquiryId);
      }
      
      // Update the inquiries list
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId 
            ? { ...inquiry, status: action === 'approve' ? 'approved' : 'rejected' } 
            : inquiry
        )
      );
      
      toast({
        title: `Inquiry ${action === 'approve' ? 'approved' : 'rejected'} successfully`
      });
    } catch (error) {
      console.error(`Error ${action}ing inquiry:`, error);
      toast({
        title: `Failed to ${action} inquiry`,
        variant: "destructive"
      });
    }
  };

  const handleVerifyProperty = async (id: string) => {
    try {
      await propertyApi.verifyProperty(id);
      setProperties(prev => 
        prev.map(property => 
          property.id === id ? { ...property, isVerified: true } : property
        )
      );
      toast({
        title: 'Property verified successfully'
      });
    } catch (error) {
      console.error('Error verifying property:', error);
      toast({
        title: 'Failed to verify property',
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          {user?.role === 'admin' ? 'Manage properties and inquiries' :
           user?.role === 'property_owner' ? 'Manage your property listings' :
           'Track your property inquiries'}
        </p>

        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="mb-6">
            {(user?.role === 'admin' || user?.role === 'property_owner') && (
              <TabsTrigger value="properties">Properties</TabsTrigger>
            )}
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            {user?.role === 'admin' && (
              <TabsTrigger value="verification">Verification Queue</TabsTrigger>
            )}
          </TabsList>

          {(user?.role === 'admin' || user?.role === 'property_owner') && (
            <TabsContent value="properties">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Your Properties</h2>
                <Button asChild>
                  <a href="/post-property">Add New Property</a>
                </Button>
              </div>
              {loading ? (
                <div className="text-center py-12">Loading properties...</div>
              ) : (
                <PropertyGrid properties={properties} />
              )}
            </TabsContent>
          )}

          <TabsContent value="inquiries">
            <h2 className="text-xl font-medium mb-6">Property Inquiries</h2>
            {loading ? (
              <div className="text-center py-12">Loading inquiries...</div>
            ) : inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{inquiry.property.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        inquiry.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{inquiry.message}</p>
                    <div className="mt-4 flex justify-end gap-2">
                      {user?.role === 'admin' && inquiry.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleInquiryAction(inquiry.id, 'approve')}>
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleInquiryAction(inquiry.id, 'reject')}>
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">No inquiries found</div>
            )}
          </TabsContent>

          {user?.role === 'admin' && (
            <TabsContent value="verification">
              <h2 className="text-xl font-medium mb-6">Properties Pending Verification</h2>
              {loading ? (
                <div className="text-center py-12">Loading verification queue...</div>
              ) : (
                <div className="space-y-4">
                  {properties
                    .filter(property => !property.isVerified)
                    .map(property => (
                      <div key={property.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{property.title}</h3>
                          <Button size="sm" onClick={() => handleVerifyProperty(property.id)}>
                            Verify
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{property.location}</p>
                      </div>
                    ))
                  }
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;