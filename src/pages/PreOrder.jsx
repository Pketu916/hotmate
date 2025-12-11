import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import { submitPreOrderForm } from "../services/googleSheets";

const PreOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedModel = location.state?.model || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    model: selectedModel || "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedModelPrice, setSelectedModelPrice] = useState("");

  const models = {
    basic: {
      name: "Basic Hotmate Model",
      price: "₹1200",
      originalPrice: "₹1600",
    },
    premium: {
      name: "Premium Hotmate Model",
      price: "₹1800",
      originalPrice: "₹2500",
    },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedModelData = models[formData.model];
    if (selectedModelData) {
      setSelectedModelPrice(selectedModelData.price);

      // Submit to Google Sheets
      const preOrderData = {
        ...formData,
        price: selectedModelData.price,
      };
      await submitPreOrderForm(preOrderData);

      // Show modal
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      model: selectedModel || "",
    });
  };

  return (
    <>
      <Section
        id="pre-order"
        padding="sm"
        background="light"
        className="pt-24 md:pt-28"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Heading size="lg" align="center" className="mb-6 text-black">
              Secure Your Hotmate Today
            </Heading>
            <Text
              size="xl"
              align="center"
              color="primary"
              className="max-w-2xl mx-auto text-gray-700"
            >
              Be among the first to experience the future of lunch. Fill out the
              form below to reserve your Hotmate and lock in your pre-order
              discount!
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="text-3xl mb-3">🎁</div>
                <Heading as="h3" size="sm" className="mb-2 text-gray-900">
                  Pre-Order Benefits
                </Heading>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)]">✓</span>
                    <span>Exclusive pre-order discount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)]">✓</span>
                    <span>Priority delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)]">✓</span>
                    <span>Free shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)]">✓</span>
                    <span>1-year warranty</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                <div className="text-3xl mb-3">⚡</div>
                <Heading as="h3" size="sm" className="mb-2 text-gray-900">
                  Limited Time Offer
                </Heading>
                <Text size="sm" color="primary" className="text-gray-700">
                  Pre-order now and save up to ₹700. Limited stock available!
                </Text>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-xl border border-gray-200"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-left text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-left text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                      placeholder="Enter your email"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                    >
                      <option value="">Choose a model</option>
                      <option value="basic">
                        Basic Hotmate Model - ₹1200 (Save ₹400)
                      </option>
                      <option value="premium">
                        Premium Hotmate Model - ₹1800 (Save ₹700)
                      </option>
                    </select>
                    {formData.model && models[formData.model] && (
                      <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-[var(--color-primary)]">
                            {models[formData.model].price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {models[formData.model].originalPrice}
                          </span>
                        </div>
                        <Text
                          size="sm"
                          color="primary"
                          className="text-gray-600 mt-1"
                        >
                          Pre-order price for {models[formData.model].name}
                        </Text>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-max text-lg py-4"
                  >
                    PRE-ORDER & RESERVE
                  </Button>

                  <Text
                    size="sm"
                    align="center"
                    color="primary"
                    className="text-gray-500"
                  >
                    By submitting this form, you agree to our terms and
                    conditions. We'll contact you within 24 hours with payment
                    details.
                  </Text>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[var(--z-modal)] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-green-600">✓</span>
              </div>
              <Heading
                as="h3"
                size="sm"
                className="mb-4 text-gray-900 text-center"
              >
                Order Confirmed!
              </Heading>
              <Text className="mb-4 text-gray-700">
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
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Back to Home
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={closeModal}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreOrder;
