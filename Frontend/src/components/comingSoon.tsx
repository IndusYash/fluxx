// src/components/ComingSoon.tsx
export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-center">
      <h1 className="text-3xl font-bold">{title} page is coming soon 🚧</h1>
    </div>
  )
}
