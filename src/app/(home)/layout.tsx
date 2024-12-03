export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full relative flex items-center justify-center">
      {children}
    </div>
  )
}
