import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; phone?: string; message?: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide a message (at least 5 characters)';
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>We'd Love to Hear from You</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Contact Brindha Cloud Kitchen
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Have a question about ingredients, custom bulk catering for a pooja or family function, or
          feedback on today's meal? Drop us a note or call us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Col: Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <h2 className="font-heading font-bold text-xl text-stone-900 pb-3 border-b border-stone-100">
              Kitchen Hubs & Direct Lines
            </h2>

            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-base">Main Cloud Hub</span>
                  <span className="text-stone-600 text-xs leading-relaxed block mt-0.5">
                    #42, 4th Main Road, Anna Nagar West, Chennai, Tamil Nadu 600040
                  </span>
                  <span className="text-stone-500 text-[11px] block mt-1">
                    (Branch 2: Venkatnarayana Road, T. Nagar)
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-base">Phone & WhatsApp</span>
                  <a
                    href="tel:+919840012345"
                    className="text-stone-700 hover:text-orange-600 font-medium block text-xs mt-0.5"
                  >
                    +91 98400 12345 (Orders & Inquiries)
                  </a>
                  <a
                    href="tel:+919840067890"
                    className="text-stone-700 hover:text-orange-600 font-medium block text-xs mt-0.5"
                  >
                    +91 98400 67890 (Bulk Catering Desk)
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-base">Email Support</span>
                  <a
                    href="mailto:orders@brindhacloudkitchen.com"
                    className="text-stone-700 hover:text-orange-600 font-medium block text-xs mt-0.5"
                  >
                    orders@brindhacloudkitchen.com
                  </a>
                  <span className="text-stone-400 text-[11px] block">
                    We respond within 2 hours during kitchen hours
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-base">Dispatch Timing</span>
                  <span className="text-stone-600 text-xs block mt-0.5">
                    Monday to Sunday: 7:00 AM – 10:30 PM (All 7 Days)
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Special Catering Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-orange-200/80 space-y-2">
            <div className="flex items-center gap-2 text-orange-800 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Bulk Meal Boxes for Events & Offices</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Planning an office lunch or family gathering? We cater 20 to 200 meal boxes with hot
              insulated containers. Call us 4 hours in advance!
            </p>
          </div>
        </div>

        {/* Right Col: Frontend Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <h2 className="font-heading font-bold text-xl text-stone-900 pb-3 border-b border-stone-100">
              Send us a Message
            </h2>

            {/* Success Message Banner */}
            {isSubmitted && (
              <div
                id="contact-success-message"
                className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-900 animate-in fade-in"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Thank you! We will get back to you soon.
                  </p>
                </div>
              </div>
            )}

            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 block">Your Name *</label>
                <input
                  id="contact-name-input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                    errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] font-medium text-rose-600">{errors.name}</p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 block">Email Address *</label>
                  <input
                    id="contact-email-input"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                      errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-medium text-rose-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 block">Phone Number *</label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                      errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-medium text-rose-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 block">Your Message *</label>
                <textarea
                  id="contact-message-input"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your feedback, inquiry, or bulk meal requirements..."
                  className={`w-full p-3 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                    errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] font-medium text-rose-600">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
