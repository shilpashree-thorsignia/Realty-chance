import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useToast } from '../../hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Step 1: Phone number form schema
  const phoneSchema = z.object({
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  });

  // Step 2: Verification code form schema
  const verificationSchema = z.object({
    code: z.string().min(4, 'Verification code must be at least 4 digits'),
  });

  // Step 3: New password form schema
  const passwordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  // Form for step 1
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  // Form for step 2
  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  // Form for step 3
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Handle phone submission
  const onPhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    try {
      await authApi.sendVerificationCode(values.phone, 'reset_password');
      setPhone(values.phone);
      toast({
        title: 'Verification code sent',
        description: 'Please check your phone for the verification code',
      });
      setStep(2);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to send verification code',
        variant: 'destructive',
      });
    }
  };

  // Handle verification code submission
  const onVerificationSubmit = async (values: z.infer<typeof verificationSchema>) => {
    try {
      await authApi.verifyPhone(phone, values.code);
      toast({
        title: 'Verification successful',
        description: 'Please set your new password',
      });
      setStep(3);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Invalid verification code',
        variant: 'destructive',
      });
    }
  };

  // Handle password reset submission
  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      const code = verificationForm.getValues('code');
      await authApi.resetPasswordWithPhone(phone, code, values.password);
      toast({
        title: 'Password reset successful',
        description: 'You can now login with your new password',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to reset password',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          {step === 1 && 'Enter your phone number to receive a verification code'}
          {step === 2 && 'Enter the verification code sent to your phone'}
          {step === 3 && 'Create a new password'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Send Verification Code
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="space-y-4">
              <FormField
                control={verificationForm.control}
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
                Verify Code
              </Button>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => navigate('/login')}>
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;