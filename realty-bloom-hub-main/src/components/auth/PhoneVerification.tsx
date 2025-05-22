import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useToast } from '../../hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const PhoneVerification = () => {
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';

  // Redirect if no phone number is provided
  useEffect(() => {
    if (!phone) {
      navigate('/register');
    }
  }, [phone, navigate]);

  // Countdown timer for resending verification code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  // Verification code form schema
  const verificationSchema = z.object({
    code: z.string().min(4, 'Verification code must be at least 4 digits'),
  });

  // Form for verification code
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  // Handle verification code submission
  const onSubmit = async (values: z.infer<typeof verificationSchema>) => {
    try {
      await authApi.verifyPhone(phone, values.code);
      toast({
        title: 'Verification successful',
        description: 'Your phone number has been verified',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Invalid verification code',
        variant: 'destructive',
      });
    }
  };

  // Handle resending verification code
  const handleResendCode = async () => {
    try {
      await authApi.sendVerificationCode(phone);
      setResendDisabled(true);
      setCountdown(60);
      toast({
        title: 'Verification code sent',
        description: 'Please check your phone for the verification code',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to send verification code',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Phone</CardTitle>
        <CardDescription>
          Enter the verification code sent to {phone}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter verification code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          onClick={handleResendCode} 
          disabled={resendDisabled}
          className="w-full"
        >
          {resendDisabled 
            ? `Resend code in ${countdown}s` 
            : 'Resend verification code'}
        </Button>
        <Button variant="link" onClick={() => navigate('/register')}>
          Back to Registration
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PhoneVerification;