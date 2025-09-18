'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ClaimEaseLogo } from './ClaimEaseLogo';
import { FooterSlim } from './FooterSlim';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type { User } from '@/contexts/UserContext';
import { UserTier } from '@/lib/constants';
import { poppins, gilroyHeavy } from '@/lib/fonts';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a mock user
      const user: User = {
        id: '1',
        name: formData.email.split('@')[0],
        email: formData.email,
        tier: UserTier.STANDARD,
        claimsUsed: 0,
        maxClaims: 3,
      };

      onLogin(user);
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0 gradient-dark-brand pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 md:pb-12 flex flex-col min-h-screen">
          {/* Header */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <ClaimEaseLogo />
          </div>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <Card className="w-full max-w-md glass-effect backdrop-blur-lg border-primary/30">
              <CardHeader className="text-center space-y-2 pb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto glow-primary">
                  <Lock className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                </div>
                <CardTitle className={`text-2xl font-bold text-foreground ${gilroyHeavy.className}`}>
                  Welcome Back
                </CardTitle>
                <CardDescription className={`text-muted-foreground ${poppins.className}`}>
                  Sign in to your ClaimEase account
                </CardDescription>
              </CardHeader>
          
          <CardContent className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12 bg-background/50 border-primary/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 bg-background/50 border-primary/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 font-medium">
                  Forgot password?
                </a>
              </div>

              <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 btn-brand mt-8"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <a href="#" className="text-primary hover:text-primary/80 font-medium">
                    Sign up here
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <FooterSlim />
      </div>
    </div>
  </div>
  );
}