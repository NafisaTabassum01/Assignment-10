export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Account Blocked
        </h1>

        <p className="mt-4 text-gray-600">
          Your account has been blocked by the administrator.
        </p>
      </div>
    </div>
  );
}