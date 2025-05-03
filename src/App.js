import { useState } from "react";
import axios from "axios";

export default function AICodeAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generate-code", { prompt });
      setResponse(res.data.code);
    } catch (err) {
      setResponse("حدث خطأ أثناء توليد الكود.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-50 flex flex-col items-center p-6">
      <header className="text-center mb-10">
        <div className="text-4xl font-bold text-indigo-700 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 00-8 0v4H5l7 7 7-7h-3V7z" />
          </svg>
          <span>المبرمج الذكي</span>
        </div>
        <p className="text-gray-600 mt-2 text-lg">اكتب وصف الكود وسيتم توليده باستخدام الذكاء الاصطناعي</p>
      </header>

      <div className="w-full max-w-2xl shadow-xl rounded-2xl bg-white p-6 space-y-4">
        <textarea
          placeholder="مثال: اكتبلي كود تسجيل دخول بلغة PHP"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] text-right text-gray-800"
        />
        <button onClick={generateCode} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700">
          {loading ? <span className="animate-spin">...</span> : "توليد الكود"}
        </button>
        {response && (
          <textarea
            value={response}
            readOnly
            className="bg-gray-100 min-h-[200px] text-left font-mono text-sm"
          />
        )}
      </div>
    </div>
  );
}
