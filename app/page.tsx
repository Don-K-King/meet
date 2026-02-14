import { redirect } from 'next/navigation';

const FALLBACK_ROOM_NAME = 'lobby';

export default function Page() {
  const configuredRoom = process.env.NEXT_PUBLIC_DEFAULT_ROOM?.trim();
  const roomName = configuredRoom || FALLBACK_ROOM_NAME;

  redirect(`/rooms/${encodeURIComponent(roomName)}`);
}
