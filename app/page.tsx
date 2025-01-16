"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// Define the interface for FeatureCard props
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

// Feature card component for reuse
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 transition-all hover:shadow-xl text-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#85D45C]/20 mb-4 mx-auto">
        <span className="text-3xl">{icon}</span>
      </div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-2">{description}</p>
    </div>
  );
}

export default function MyComponent() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    console.log('Form submission started:', { email, phone });

    if (!db) {
      console.error('Firestore not initialized');
      setMessage({
        type: 'error',
        text: 'Service unavailable. Please try again later.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate email
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        console.log('Email validation failed:', email);
        throw new Error('Please enter a valid email address');
      }

      console.log('Attempting to store in Firestore...');
      
      // Create subscriber data
      const subscriberData = {
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        timestamp: new Date().toISOString(),
        status: 'pending',
        source: 'website'
      };

      console.log('Subscriber data:', subscriberData);

      // Store in Firestore with error handling
      const subscribersRef = collection(db, "subscribers");
      const docRef = await addDoc(subscribersRef, subscriberData);

      console.log('Successfully stored in Firestore:', { 
        documentId: docRef.id,
        ...subscriberData
      });

      // Clear form and show success
      setEmail('');
      setPhone('');
      setMessage({
        type: 'success',
        text: 'Thank you for signing up! We will contact you soon.'
      });
    } catch (error) {
      console.error('Form submission error:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.name : 'Unknown type',
        email,
        phone,
        timestamp: new Date().toISOString()
      });

      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          setMessage({
            type: 'error',
            text: 'Service temporarily unavailable. Please try again later.'
          });
        } else if (error.message.includes('failed-precondition')) {
          setMessage({
            type: 'error',
            text: 'Unable to connect to the service. Please try again later.'
          });
        } else {
          setMessage({
            type: 'error',
            text: 'An error occurred while saving your information. Please try again.'
          });
        }
      }
    } finally {
      setIsSubmitting(false);
      console.log('Form submission completed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav className="fixed w-full bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Expyr.ai"
                width={56}
                height={56}
                priority
              />
              <span className="text-2xl font-bold text-[#0D5F3C] ml-2 tracking-tight">Expyr.ai</span>
              <span className="ml-2 text-xs px-2 py-0.5 bg-[#85D45C]/10 text-[#0D5F3C] rounded-full font-medium">beta</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="mailto:tpatwa30@gmail.com" className="text-[#0D5F3C] hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-4">
            <div className="flex justify-center mb-12 mt-8">
              <div className="tagline-box">
                <div className="icon">
                  <span className="text-[#85D45C]">🛒</span>
                </div>
                <div className="text">
                  <span>Smart Grocery Assistant</span>
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-extrabold text-[#0D5F3C]">
              Stop Wasting, Start Saving.
            </h1>
            <h2 className="text-2xl mb-6">
              Never Throw Away Expired Groceries Again!
            </h2>
            <Image
              src="/images/scanning-grocery.jpg"
              alt="scanning image"
              width={500}
              height={300}
              className="mx-auto my-4 w-1/2 max-w-md p-4 border border-gray-200 rounded-lg shadow-lg"
            />
            <p className="text-lg mb-8">
              Expyr.ai leverages AI to transform your grocery management by scanning labels and capturing fresh produce details with just a click. Stay organized and eco-conscious by minimizing waste and maximizing food utilization.
            </p>
            <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-center mb-4">Get Early Access</h3>
              
              {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-center ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#85D45C] focus:border-[#85D45C] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#85D45C] focus:border-[#85D45C] outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="w-full py-3 bg-[#85D45C] text-white hover:bg-[#85D45C]/90 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up Now!'}
                </button>
              </form>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <FeatureCard
                icon="📅"
                title="Expiry Tracking"
                description="Automatically track expiry dates with real-time scanning and receive alerts before your food spoils."
              />
              <FeatureCard
                icon="🔔"
                title="Smart Notifications"
                description="Get timely notifications to use items at their peak, ensuring you enjoy your groceries at their best."
              />
              <FeatureCard
                icon="📊"
                title="Dashboard View"
                description="Easily view all your scanned items at a glance, with detailed consume-by dates and storage locations, enhancing your kitchen management."
              />
              <FeatureCard
                icon="🍽️"
                title="Meal Planning"
                description="Use our intelligent suggestions to plan meals based on what is expiring soon, reducing waste and saving money."
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 my-4">
  <Image
    src="/images/food-wastage.jpeg"
    alt="Food wastage"
    width={500}
    height={300}
    className="w-1/2 max-w-md p-4 border border-gray-200 rounded-lg shadow-lg"
  />
  <Image
    src="/images/expyr-dashboard.png"
    alt="Dashboard app"
    width={500}
    height={300}
    className="w-1/2 max-w-md p-4 border border-gray-200 rounded-lg shadow-lg"
  />
</div>
      </main>
    </div>
  );
}
