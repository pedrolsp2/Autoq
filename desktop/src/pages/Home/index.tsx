import { useStore } from '@/store';

export default function Home() {
  const usuario = useStore.use.usuario();
  return <div>Home {usuario}</div>;
}
