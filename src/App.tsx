import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Terms } from "./pages/Terms";
import { Login } from "./pages/Login";
import { SignupWizard } from "./pages/signup/SignupWizard";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupWizard />} />
      </Routes>
    </>
  );
}
