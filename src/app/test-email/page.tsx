"use client";

import React, { useState } from "react";

const TestEmailPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const testEmailConfig = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/test-email");
      const data = await response.json();

      if (data.success) {
        setResult("✅ Email configuration is valid and ready to use!");
      } else {
        setError(`❌ ${data.error}: ${data.message || ""}`);
      }
    } catch (err) {
      setError("❌ Failed to test email configuration");
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(`✅ ${data.message}`);
      } else {
        setError(`❌ ${data.error}`);
      }
    } catch (err) {
      setError("❌ Failed to send test email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Email Configuration Test
        </h1>

        {/* Test Configuration */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Test Email Configuration
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            This will test if your email environment variables are properly
            configured.
          </p>
          <button
            onClick={testEmailConfig}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Testing..." : "Test Configuration"}
          </button>
        </div>

        {/* Send Test Email */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Send Test Email
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Send a test verification email to verify the full email flow.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendTestEmail}
              disabled={loading || !email}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Test Email"}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{result}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Setup Instructions:
          </h3>
          <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
            <li>
              Create a <code>.env.local</code> file in your project root
            </li>
            <li>
              Add your Gmail credentials:
              <br />
              <code>EMAIL_USER=your-email@gmail.com</code>
              <br />
              <code>EMAIL_APP_PASSWORD=your-16-char-app-password</code>
            </li>
            <li>
              Generate a Gmail App Password in your Google Account settings
            </li>
            <li>Restart your development server</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestEmailPage;
