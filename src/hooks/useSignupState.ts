import { useEffect, useState } from "react";
import { emptySignupData, type SignupData } from "../lib/types";

const STORAGE_KEY = "extroverts.signup.v1";

function load(): SignupData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptySignupData;
    return { ...emptySignupData, ...JSON.parse(raw) };
  } catch {
    return emptySignupData;
  }
}

export function useSignupState() {
  const [data, setData] = useState<SignupData>(load);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = (patch: Partial<SignupData>) => setData((prev) => ({ ...prev, ...patch }));

  const reset = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setData(emptySignupData);
  };

  return { data, update, reset };
}
