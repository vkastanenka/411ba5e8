// components
import { Card } from '@/components/ui/card'
import { Header } from '@/components/layout/header'

export const CallsCard = ({ children }: { children: React.ReactElement | string }) => {
  return (
    <Card className="w-[376px] h-[666px] overflow-scroll relative">
      <Header />
      <div className="p-[20px]">{children}</div>
    </Card>
  )
}
