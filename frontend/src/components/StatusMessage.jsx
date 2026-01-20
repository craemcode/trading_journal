

export default function StatusMessage({ status, onClose }) {
  if (!status) return null;

  const isSuccess = status.type === "success";

  return (
    <div
      className={`mb-4 flex items-start justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
        isSuccess
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span>{status.msg}</span>

      <button
        onClick={onClose}
        className={`rounded p-1 transition hover:bg-black/10 ${
          isSuccess ? "text-emerald-700" : "text-red-700"
        }`}
        aria-label="Dismiss alert"
      >
        X
      </button>
    </div>
  );
}
