export interface LeaderPayload {
  name: string;
  email: string;
  phone: string;
  roll: string;
  branch: string;
  year: string;
}

export interface MemberPayload {
  name: string;
  branch: string;
  year: string;
}

export interface TeamPayload {
  teamName: string;
  projectName: string;
  pptLink: string;
  imageLink: string;
  leader: LeaderPayload;
  member1: MemberPayload;
  member2: MemberPayload;
  member3: MemberPayload;
  member4: MemberPayload;
}

export async function uploadFile(file: File, type: 'pdf' | 'image') {
  const formData = new FormData();
  formData.append('file', file);
  const BASE = (import.meta as any).env?.VITE_REG_API_URL || '';
  const endpoint = type === 'pdf' ? `${BASE}/api/upload/ppt` : `${BASE}/api/upload/photo`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = payload?.message || 'Upload failed';
    throw new Error(msg);
  }

  // uploadRoutes returns { url, key, path }
  return payload.url as string;
}

export async function submitTeam(team: TeamPayload) {
  const BASE = (import.meta as any).env?.VITE_REG_API_URL || '';
  const res = await fetch(`${BASE}/api/ideathonTeam/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = payload?.message || 'Save failed';
    throw new Error(msg);
  }

  return payload;
}

export async function checkTeamExists(teamName?: string, leaderRoll?: string) {
  const BASE = (import.meta as any).env?.VITE_REG_API_URL || '';
  const res = await fetch(`${BASE}/api/ideathonTeam/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamName, leaderRoll }),
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = payload?.message || 'Check failed';
    throw new Error(msg);
  }

  return payload as { exists: boolean; field?: string };
}
