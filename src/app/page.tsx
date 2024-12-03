// actions
import { getActivityCalls } from '@/actions/activity'

// components
import { ArchiveButton } from '@/components/archive-button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'
import { ActivityCallCard } from '@/components/activity-call-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const HomePage = async () => {
  const { data: calls } = await getActivityCalls()

  if (!calls) {
    return <div>Server error!</div>
  }

  const feedCalls = calls.filter((call) => !call.is_archived)
  const archiveCalls = calls.filter((call) => call.is_archived)

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
                {feedCalls.length > 0 ? (
                  <>
                    <ArchiveButton calls={feedCalls} type="archive" />
                    {feedCalls.map((call, i) => {
                      return <ActivityCallCard key={i} call={call} />
                    })}
                  </>
                ) : (
                  <p>No calls in archive</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="archive">
              <div className="flex flex-col gap-4">
                {archiveCalls.length > 0 ? (
                  <>
                    <ArchiveButton calls={archiveCalls} type="unarchive" />
                    {archiveCalls.map((call, i) => {
                      return <ActivityCallCard key={i} call={call} />
                    })}
                  </>
                ) : (
                  <p>No calls in archive</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

export default HomePage
