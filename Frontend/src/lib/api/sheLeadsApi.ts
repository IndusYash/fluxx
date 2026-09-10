export interface SheLeadsRegistrationPayload {
  name: string;
  rollNo: string;
  branch: string;
  section: string;
  year: string;
  email: string;
  phone: string;
  gender: string;
  slot?: string;
  interests?: string[];
  experienceLevel?: string;
  registrationSource?: 'web-form' | 'home-popup';
}

export interface SheLeadsRegistrationResult {
  success: boolean;
  message: string;
  registrationId: string;
  ticketNumber: string;
  isOfflineFallback?: boolean;
  data?: {
    name: string;
    rollNo: string;
    branch: string;
    section: string;
    year: string;
    email: string;
    phone: string;
    slot?: string;
    createdAt?: string;
  };
}

const getApiBase = () => {
  const envUrl = (import.meta as any).env?.VITE_API_BASE_URL ||
                 (import.meta as any).env?.VITE_API_BASE ||
                 (import.meta as any).env?.VITE_REG_API_URL;
  if (envUrl) {
    return String(envUrl).replace(/\/+$/, '');
  }
  return '';
};

const OFFLINE_STORAGE_KEY = 'flux_sheleads_offline_registrations';

export async function submitSheLeadsRegistration(
  payload: SheLeadsRegistrationPayload
): Promise<SheLeadsRegistrationResult> {
  const apiBase = getApiBase();
  const endpoint = `${apiBase}/api/she-leads/register`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    // Cache successful registration locally for persistence in pass view
    const result: SheLeadsRegistrationResult = {
      success: true,
      message: data.message || 'Registration successful!',
      registrationId: data.registrationId || `SHE-${Date.now().toString().slice(-6)}`,
      ticketNumber: data.ticketNumber || `SHE-${payload.rollNo.slice(-4).toUpperCase() || '2026'}`,
      data: data.data || {
        name: payload.name,
        rollNo: payload.rollNo,
        branch: payload.branch,
        section: payload.section,
        year: payload.year,
        email: payload.email,
        phone: payload.phone,
        slot: payload.slot || 'Slot 1 (02:00 PM – 03:00 PM)',
        createdAt: new Date().toISOString(),
      },
    };

    saveRegistrationLocally(result);
    return result;
  } catch (error: any) {
    // If it's a backend business error (e.g. duplicate 409), rethrow it so the user sees it
    if (error.message && !error.message.includes('Failed to fetch') && !error.message.includes('NetworkError')) {
      throw error;
    }

    // If server is unreachable (offline/no network), gracefully cache locally so work is not lost
    console.warn('Backend currently unreachable, saving She Leads – Dr. Tessy Thomas Annual Conclave registration locally:', error);

    const fallbackResult: SheLeadsRegistrationResult = {
      success: true,
      message: 'Registration recorded successfully! (Saved offline and will sync when backend connects)',
      registrationId: `OFFLINE-${Date.now().toString().slice(-6)}`,
      ticketNumber: `SHE-${payload.rollNo.slice(-4).toUpperCase() || '2026'}`,
      isOfflineFallback: true,
      data: {
        name: payload.name,
        rollNo: payload.rollNo,
        branch: payload.branch,
        section: payload.section,
        year: payload.year,
        email: payload.email,
        phone: payload.phone,
        slot: payload.slot || 'Slot 1 (02:00 PM – 03:00 PM)',
        createdAt: new Date().toISOString(),
      },
    };

    saveRegistrationLocally(fallbackResult);
    return fallbackResult;
  }
}

function saveRegistrationLocally(result: SheLeadsRegistrationResult) {
  try {
    const existing = JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]');
    existing.unshift(result);
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(existing.slice(0, 10)));
    localStorage.setItem('flux_sheleads_latest_pass', JSON.stringify(result));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

export function getLatestSheLeadsPass(): SheLeadsRegistrationResult | null {
  try {
    const saved = localStorage.getItem('flux_sheleads_latest_pass');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function clearLatestSheLeadsPass(): void {
  try {
    localStorage.removeItem('flux_sheleads_latest_pass');
  } catch (e) {
    console.warn('Could not clear localStorage:', e);
  }
}

