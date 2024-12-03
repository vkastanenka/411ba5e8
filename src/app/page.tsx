// actions
import { getActivityCalls } from '@/actions/activity'

// components
import { Card } from '@/components/card'
import { Header } from '@/components/header'
import { ActivityCallCard } from '@/components/activity-call-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const HomePage = async () => {
  const { data: calls } = await getActivityCalls()

  if (!calls) {
    return <div>Server error!</div>
  }

  return (
    <div className="h-full relative flex items-center justify-center">
      <Card className="w-[376px] h-[666px] overflow-scroll">
        <Header />
        <div className="p-[20px]">
          <Tabs defaultValue="feed">
            <TabsList className="flex justify-center mb-4">
              <TabsTrigger className="grow" value="feed">
                Activity Feed
              </TabsTrigger>
              <TabsTrigger className="grow" value="archive">
                Archive
              </TabsTrigger>
            </TabsList>
            <TabsContent value="feed">
              <div className="flex flex-col gap-4">
                <button className="text-[16px] p-2 border-[1px] rounded-md bg-slate-100">
                  Archive All Calls
                </button>
                {calls
                  .filter((call) => !call.is_archived)
                  .map((call, i) => {
                    return <ActivityCallCard key={i} call={call} />
                  })}
              </div>
            </TabsContent>
            <TabsContent value="archive">
              <div className="flex flex-col gap-4">
                <button className="text-[16px] p-2 border-[1px] rounded-md bg-slate-100">
                  Unarchive All Calls
                </button>
                {calls
                  .filter((call) => call.is_archived)
                  .map((call, i) => {
                    return <ActivityCallCard key={i} call={call} />
                  })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

export default HomePage
