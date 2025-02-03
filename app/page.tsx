"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
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
      {/* Header */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="logo-section">
              <div className="logo-wrapper">
                <Image
                  src="/images/logo.png"
                  alt="Expyr.ai"
                  width={48}
                  height={48}
                  priority
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-[#0D5F3C]">Expyr.ai</span>
              <span className="beta-badge">beta</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#features" className="nav-link">Features</Link>
              <Link 
                href="#signup" 
                className="px-4 py-2 bg-[#85D45C] text-white font-semibold rounded-lg shadow-md hover:bg-[#6CBD4A] transition-colors duration-200 flex items-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Hero Content */}
              <div className="w-full lg:w-7/12 animate-fade-in">
                <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D5F3C] leading-tight mb-6">
                  Stop Wasting,<br />Start Saving.
                </h1>
                <Analytics />
                <h2 className="hero-subtitle">
                  Scan. Track. Never waste food again!
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2 animate-float">
                    <Image
                      src="/images/scanning-grocery.jpg"
                      alt="scanning image"
                      width={500}
                      height={300}
                      className="w-full rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Expyr.ai leverages <span className="highlight">AI to transform your grocery management</span> by scanning labels and capturing fresh produce details with just a click. Stay organized and eco-conscious by <span className="highlight">minimizing waste</span> and maximizing food utilization.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Form */}
              <div id="signup" className="w-full lg:w-5/12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="cta-card">
                  <div className="flex justify-center mb-6">
                    <div className="gift-icon-wrapper">
                      <div className="gift-icon">
                        <span className="text-2xl relative z-10">🎁</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">Join Our Beta Program!</h3>
                  <p className="text-gray-600 text-center mb-6">Be Among the First to Experience Smarter Grocery Management</p>
                  
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
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone number (optional)"
                        className="input-field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="cta-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing Up...' : 'Sign Up Now!'}
                    </button>
                  </form>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center">
                      <span className="text-[#85D45C] mr-2">✓</span>
                      <span className="text-gray-600">Reduce food waste and save money</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#85D45C] mr-2">✓</span>
                      <span className="text-gray-600">Get early access to cutting-edge AI tools</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#85D45C] mr-2">✓</span>
                      <span className="text-gray-600">Be part of an eco-conscious community</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 features-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D5F3C] text-center mb-4">
              How Expyr.ai Works for You
            </h2>
            <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Our smart features work together to help you reduce food waste, save money, and live more sustainably.
            </p>
            
            <div className="features-grid">
              {/* Real-Time Expiry Tracking */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="text-3xl">📅</span>
                  <div className="scan-line" />
                </div>
                <h3 className="feature-title">Real-Time Expiry Tracking</h3>
                <p className="feature-description">
                  Automatically track expiry dates with live scanning technology. Never let your groceries go to waste again.
                </p>
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#85D45C]">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
              </div>

              {/* Smart Notifications */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="text-3xl">🔔</span>
                  <div className="notification-dot" />
                </div>
                <h3 className="feature-title">Smart Notifications</h3>
                <p className="feature-description">
                  Get timely reminders about food nearing its expiry date, ensuring you use items at their best and reduce waste.
                </p>
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#85D45C]">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </div>
              </div>

              {/* Meal Planning */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="text-3xl">🍳</span>
                </div>
                <h3 className="feature-title">Smart Recipe Suggestions</h3>
                <p className="feature-description">
                  Receive intelligent meal suggestions based on ingredients that are about to expire, helping you save money and minimize waste.
                </p>
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#85D45C]">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                  </svg>
                </div>
              </div>

              {/* Dashboard View */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="feature-title">Smart Dashboard</h3>
                <p className="feature-description">
                  Easily view and organize all your scanned items, with detailed expiry dates and storage information at a glance.
                </p>
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#85D45C]">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="features-cta">
              <a href="#signup" className="features-cta-button">
                See how Expyr.ai works for you
              </a>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section className="review-section py-24">
          <div className="container mx-auto px-4">
            <div className="review-content max-w-3xl mx-auto text-center">
              <div className="review-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto mb-6 text-[#85D45C] animate-float">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D5F3C] mb-4">
                We Value Your Feedback
              </h2>
              <h3 className="text-xl text-gray-600 mb-8">
                Be part of shaping the future of Expyr.ai
              </h3>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Expyr.ai is in its <span className="highlight">beta testing phase</span>, and we're eagerly waiting for feedback from our first users. 
                We'd love to hear your thoughts as we bring this smart grocery assistant to life!
              </p>
              <a 
                href="#signup" 
                className="review-cta-button animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                Join the Beta
              </a>
            </div>
          </div>
          <div className="review-background" />
        </section>

        {/* Footer */}
        <footer className="bg-white py-12 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/logo.png"
                    alt="Expyr.ai"
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                  <span className="text-xl font-bold text-[#0D5F3C]">Expyr.ai</span>
                </div>
                <p className="text-gray-600">
                  Proudly helping households reduce food waste and save money.
                </p>
                <a href="mailto:contact@expyr.ai" className="text-[#0D5F3C] hover:text-[#85D45C] transition-colors mt-2 block">
                  contact@expyr.ai
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-[#0D5F3C] mb-4">Links</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-[#85D45C]">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-[#85D45C]">Terms of Service</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-[#85D45C]">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0D5F3C] mb-4">Connect</h4>
                <div className="flex space-x-4">
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/expyr.ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer-social-icon" 
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* X (Twitter) */}
                  <a 
                    href="https://twitter.com/expyrai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer-social-icon" 
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a 
                    href="https://www.tiktok.com/@expyrai?_t=ZP-8tWtJpMadcl&_r=1" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer-social-icon" 
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  {/* Email */}
                  <a 
                    href="mailto:contact@expyr.ai" 
                    className="footer-social-icon" 
                    aria-label="Email"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Sticky CTA */}
        <div className="sticky-cta" id="sticky-cta">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <p className="text-[#0D5F3C] font-semibold hidden md:block">Ready to start saving?</p>
              <a href="#signup" className="cta-button px-6 py-2 text-sm">Join the Beta Program</a>
            </div>
          </div>
        </div>
      </main>

      {/* Add scroll listener for sticky CTA */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const stickyCta = document.getElementById('sticky-cta');
            const signupSection = document.getElementById('signup');
            if (stickyCta && signupSection) {
              const scrollPosition = window.scrollY;
              const signupPosition = signupSection.offsetTop;
              if (scrollPosition > signupPosition + 500) {
                stickyCta.classList.add('visible');
              } else {
                stickyCta.classList.remove('visible');
              }
            }
          });
        `
      }} />

      {/* Add parallax effect script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const parallaxWrappers = document.querySelectorAll('.parallax-wrapper');
            
            window.addEventListener('mousemove', function(e) {
              parallaxWrappers.forEach(wrapper => {
                const rect = wrapper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const moveX = (e.clientX - centerX) / 20;
                const moveY = (e.clientY - centerY) / 20;
                
                const element = wrapper.querySelector('.parallax-element');
                if (element) {
                  element.style.transform = \`translate3d(\${moveX}px, \${moveY}px, 0)\`;
                }
              });
            });

            // Add ripple effect
            document.querySelectorAll('.ripple').forEach(button => {
              button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.offsetLeft;
                const y = e.clientY - e.target.offsetTop;
                
                const ripple = document.createElement('span');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
              });
            });
          });
        `
      }} />
    </div>
  );
}
