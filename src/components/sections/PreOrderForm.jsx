import React, { useState } from "react";
import Section from "../common/Section";
import Heading from "../common/Heading";
import Text from "../common/Text";
import Button from "../common/Button";

const PreOrderForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    model: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedModelPrice, setSelectedModelPrice] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prices = {
      basic: "₹1200",
      premium: "₹1800",
    };
    setSelectedModelPrice(prices[formData.model] || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      model: "",
    });
  };

  return (
    <>
      <Section id="pre-order" padding="md" background="light">
        <div className="max-w-2xl mx-auto text-center">
          <Heading size="lg" align="center" className="mb-6 text-black">
            Secure Your Hotmate Today.
          </Heading>
          <Text
            size="xl"
            align="center"
            color="primary"
            className="mb-12 max-w-xl mx-auto text-gray-900"
          >
            Be among the first to experience the future of lunch. Fill out the
            form below to reserve your Hotmate and lock in your pre-order
            discount!
          </Text>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-left text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-left text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-left text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-left text-sm font-semibold text-gray-700 mb-2"
                >
                  Select Model <span className="text-red-500">*</span>
                </label>
                <select
                  id="model"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                >
                  <option value="">Choose a model</option>
                  <option value="basic">Basic Hotmate Model - ₹1200</option>
                  <option value="premium">Premium Hotmate Model - ₹1800</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                PRE-ORDER & RESERVE
              </Button>
            </div>
          </form>
        </div>
      </Section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[var(--z-modal)] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <Heading as="h3" size="sm" className="mb-4 text-center">
                Order Confirmed!
              </Heading>
              <Text className="mb-4">
                Thank you for your pre-order! Your order amount is{" "}
                <span className="font-bold text-[var(--color-primary)]">
                  {selectedModelPrice}
                </span>
                .
              </Text>
              <Text size="sm" className="text-gray-600 mb-6">
                We will contact you soon with payment details and delivery
                information.
              </Text>
              <Button variant="primary" size="md" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreOrderForm;
